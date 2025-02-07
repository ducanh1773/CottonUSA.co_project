import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import HeaderCottonUSA from "../HeaderCottonUSA";
import ItemShoppingCart from "./ItemShoppingCart/index";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

function ShoppingCart() {
    const [products, setProducts] = useState([]); // Array of product IDs
    const [detailedProducts, setDetailedProducts] = useState([]); // Array for detailed product info
    const [error, setError] = useState(null);
    const [orderMessage, setOrderMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductsInCart = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Bạn chưa đăng nhập.");
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:80/api/cart/items`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setProducts(response.data); 
                console.log(products);// Set array of product IDs
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Không thể lấy thông tin giỏ hàng.");
            }
        };

        fetchProductsInCart();
    }, []);
    

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const detailed = await Promise.all(
                    products.map(productId =>
                        axios.get(`http://localhost:80/api/products/findProduct/${productId}`)
                            .then(response => response.data)
                            .catch(error => {
                                console.error(`Error fetching product ${productId}:`, error);
                                return null; // Return null if there's an error fetching the product
                            })
                    )
                );
                setDetailedProducts(detailed.filter(product => product)); // Filter out nulls
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        if (products.length) {
            fetchProductDetails();
        }
    }, [products]);

    // const handlePlaceOrder = async () => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         setError("Bạn chưa đăng nhập.");
    //         return;
    //     }

    //     try {
    //         const response = await axios.post(
    //             'http://localhost:80/api/orders',
    //             { products }, // Send the array of product IDs
    //             {
    //                 headers: { Authorization: `Bearer ${token}` }
    //             }
    //         );

    //         if (response.data.success) {
    //             setOrderMessage("Đặt hàng thành công!");
    //             setTimeout(() => {
    //                 navigate("/order_confirmation");
    //             }, 1000);
    //         } else {
    //             setOrderMessage("Đặt hàng không thành công. Vui lòng thử lại.");
    //         }
    //     } catch (error) {
    //         console.error("Error placing order:", error);
    //         setOrderMessage("Có lỗi xảy ra khi đặt hàng.");
    //     }
    // };

    if (error) return <div className="error">{error}</div>;
    if (!detailedProducts.length) return <div>Đang tải giỏ hàng...</div>;

    return (
      <div>
        <HeaderCottonUSA />
        <div className="subjectShoppingCart">
          <h1>Giỏ hàng</h1>
        </div>
        <div className="allObjectOfShoppingCart">
          <div className="mainLeftShoppingCart">
            <div className="objectOfShoppingCart">
              <h4 className="prdOfObjectOfShoppingCart">Sản phẩm</h4>
              <h4 className="numberOfObjectOfShoppingCart">Số lượng</h4>
              <h4>Tổng cộng</h4>
            </div>
            <div>
              {detailedProducts.map((product) => {
                // Determine size and color based on product ID
                let color = "Không có màu";
                let size = "Không có kích thước";

                if (product.id === 1) {
                  color = "Trắng"; // White
                  size = "L"; // Size L
                } else if (product.id === 0) {
                  color = "Đen"; // Black
                  size = "M"; // Size M
                }

                return (
                  <ItemShoppingCart
                    key={product.id}
                    InformationPrd={{
                      id: product.id,
                      imgUrl1: product.img_product,
                      name: product.nameProduct,
                      price: product.priceProduct,
                      size:
                        product.skus?.[0]?.size_attribute_id === 1
                          ? "M"
                          : product.skus?.[0]?.size_attribute_id === 0
                          ? "L"
                          : "Không có kích thước",
                      color:
                        product.skus?.[0]?.color_attribute_id === 1
                          ? "Trắng"
                          : product.skus?.[0]?.color_attribute_id === 0
                          ? "Đen"
                          : "Không có kích thước"
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="mainRightShoppingCart">
            <div>
              <textarea placeholder="Ghi chú đặt hàng"></textarea>
            </div>
            <div>
              <a href="./order_confirmation">
                <button className="buyProduct">Đặt hàng</button>
              </a>
            </div>
          </div>
          {orderMessage && <div className="orderMessage">{orderMessage}</div>}
        </div>
      </div>
    );
}

export default ShoppingCart;