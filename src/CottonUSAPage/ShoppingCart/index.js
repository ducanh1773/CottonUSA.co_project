import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import HeaderCottonUSA from "../HeaderCottonUSA";
import ItemShoppingCart from "./ItemShoppingCart/index";

function ShoppingCart({ customerId }) {
  const [cartInfo, setCartInfo] = useState(null);
  const [error, setError] = useState(null);
    const[product , setProduct] = useState();
  const [info6, setInfo6] = useState([
    {
      imgUrl1: "https://cottonusa.co/cdn/shop/files/1_6.jpg?v=1696431420&width=800",
      name: "MLB Los Angeles Dodgers Logo Red T-Shirt",
      price: "119.000",
      size:"XL"
    
    },

  
  ]);
  useEffect(() => {
    const fetchCartInfo = async () => {
      try {
        const response = await axios.get("http://localhost:80/api/cart/1/product-ids");
        setCartInfo(response.data);
      } catch (err) {
        setError("Could not fetch cart details for this customer.");
        console.error(err);
      }
    };

    fetchCartInfo();
  }, [customerId]);

  console.log(cartInfo);

  useEffect(() => {
    fetch(`http://localhost:80/api/products/findProduct/${cartInfo}`)
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => {
        console.log(data); // Debug log
        if (data) {
            setInfo6({
              imgUrl1: data.img_product,
              name: data.nameProduct,
              price: data.priceProduct,
              description: "Chất liệu: 100% Cotton" // Bạn có thể tùy chỉnh theo dữ liệu thực tế
            });
        } else {
          console.log("Product not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [cartInfo]);



  


  if (error) return <div>{error}</div>;
  if (!cartInfo) return <div>Loading cart...</div>;

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
            <ItemShoppingCart InformationPrd={[info6]} />
            
          </div>
        </div>
        <div className="mainRightShoppingCart">
          <h3>Tổng phụ: {cartInfo.subTotal}</h3>
          <h2>Tổng cộng: {cartInfo.total}</h2>
          <textarea placeholder="Ghi chú đặt hàng"></textarea>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
