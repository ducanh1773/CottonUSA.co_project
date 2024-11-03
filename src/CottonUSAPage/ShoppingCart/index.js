import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import HeaderCottonUSA from "../HeaderCottonUSA";
import ItemShoppingCart from "./ItemShoppingCart/index";

function ShoppingCart({ customerId }) {
  const [cartInfo, setCartInfo] = useState(null); // Chứa thông tin giỏ hàng
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Chứa danh sách sản phẩm chi tiết
  const { id } = 12;
  const [productIds, setProductIds] = useState({});
  const [products, setProducts] = useState([]);
  // useEffect(() => {
  //  //  Lấy thông tin giỏ hàng dựa trên ID khách hàng
  //   const fetchCartInfo = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:80/api/cart/1/product-ids`
  //       );
  //       setCartInfo(response.data);
  //     } catch (err) {
  //       setError("Không thể lấy thông tin giỏ hàng.");
  //       console.error(err);
  //     }
  //   };

  //   fetchCartInfo();
  // }, [customerId]);

  useEffect(() => {
    const fetchProductIds = async (cartId) => {
      try {
        const response = await axios.get(
          `http://localhost:80/api/cart/${cartId}/product-ids`
        );
        setProductIds(response.data);

        console.log("Product IDs:", productIds);
      } catch (error) {
        console.error("Error fetching product IDs:", error);
      }
    };

    // Example cartId to be replaced by dynamic data
    const cartId = 1;
    fetchProductIds(cartId);
  }, []);

  console.log(productIds);

  // useEffect(() => {
  //   fetch(`http://localhost:80/api/products/findProduct/1`)
  //     .then((response) => response.json()) // Convert response to JSON
  //     .then((data) => {
  //       console.log(data); // Debug log
  //       if (data) {
  //         setProduct({
  //           imgUrl1: data.img_product,
  //           name: data.nameProduct,
  //           price: data.priceProduct,
  //           description: "Chất liệu: 100% Cotton",
  //           skus: data.skus
  //         });
  //         console.log(product);
  //       } else {
  //         console.log("Product not found");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching product:", error);
  //     });
  // }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productPromises = productIds.map((id) =>
          fetch(`http://localhost:80/api/products/findProduct/${id}`).then(
            (response) => response.json()
          )
        );

        const productsData = await Promise.all(productPromises);
        setProducts(productsData);
        // Assuming setProducts is for an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [productIds]);
  console.log(products);

  // if (error) return <div>{error}</div>;
  // if (!cartInfo) return <div>Đang tải giỏ hàng...</div>;

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
            {products.map((product) => (
              <ItemShoppingCart
                key={product.id}
                InformationPrd={{
                  id: product.id,
                  imgUrl1: product.img_product,
                  name: product.nameProduct,
                  price: product.priceProduct,
                  size:
                    product.skus?.[0]?.size_attribute_id ||
                    "Không có kích thước",
                  color: product.skus?.[0]?.color_attribute_id || "Không có màu"
                }}
              />
            ))}
          </div>
        </div>
        <div className="mainRightShoppingCart">
          <div>
            <textarea placeholder="Ghi chú đặt hàng"></textarea>
          </div>
          <div>
            <button className="buyProduct">Đặt hàng</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
