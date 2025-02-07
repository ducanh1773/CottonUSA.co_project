import React from "react";
import HeaderCottonUSA from "../HeaderCottonUSA";
import EndPageCottonUSA from "../endPage";
import "./index.css"
import ProductCottonUSAInHomePage from "../HomePageCottonUSA/ProductInHomePage"
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
function ProductPage() {
    const info1 = [{ imgUrl1: "https://cottonusa.co/cdn/shop/files/1_6.jpg?v=1696431420&width=800", name: "MLB Los Angeles Dodgers Logo Red T-Shirt", price: '119.000' }]
    const [info6, setInfo6] = useState([
        {
          imgUrl1: "https://cottonusa.co/cdn/shop/files/1_6.jpg?v=1696431420&width=800",
          name: "MLB Los Angeles Dodgers Logo Red T-Shirt",
          price: "119.000",
        
        },
      ]);
    
      // Sử dụng useEffect để fetch dữ liệu khi component được render
      useEffect(() => {
        fetch("http://localhost:80/api/products")
          .then((response) => response.json()) // Convert response to JSON
          .then((data) => {
            console.log(data); // Log the received data for debugging
    
            // Kiểm tra xem dữ liệu có phải là một mảng và không rỗng
            if (Array.isArray(data) && data.length > 0) {
              // Lọc các sản phẩm có category_id = 3
              const filteredProducts = data.filter(
                (product) => product.category_id === "3"
              );
              console.log(filteredProducts)

              const topFiveProducts = filteredProducts.slice(0, 5);

              // Chuyển đổi dữ liệu đã lọc sang cấu trúc của info1
              const updatedProducts = topFiveProducts.map((product) => ({
                imgUrl1: product.img_product, // Sử dụng key phù hợp từ phản hồi API
                name: product.nameProduct,
                price: product.priceProduct,
                id:product.id
              }));
    
              // Cập nhật state với dữ liệu mới
              setInfo6(updatedProducts);
            } else {
              console.log("No products found");
            }
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      }, []);
    return (
        <div>
            <div className="headerOnAboutUSPage">
                <HeaderCottonUSA></HeaderCottonUSA>
            </div>
            <div className="SubjectPageItermList">
                <h1>T-SHIRT</h1>
            </div>
            <div className="arrangeIterm">
                <div className="subjectArrangeIterm">
                    <box-icon name='abacus'></box-icon>
                    <p>Bộ lọc</p>
                </div>
                <div className="arrangeItermButton">
                    <h4>Sắp xếp theo : </h4>
                    <p>Bán chạy nhất</p>
                    <box-icon name='down-arrow-circle' type='solid' color='#cdc9c9' ></box-icon>
                </div>
            </div>
            <div className="allItermAndSelectionPrd">
                <div className="mainLeftAllItermAndSelectionPrd">
                    <div>
                        <p>Chỉ có trong kho</p>
                    </div>
                    <div className="arrnageItermPrice">
                        <p>Giá</p>
                        <box-icon name='down-arrow-circle' type='solid' ></box-icon>
                    </div>
                </div>
                <div>
                    <div className="PrdInListItermPage">
                        <ProductCottonUSAInHomePage InformationPrd={info6}></ProductCottonUSAInHomePage>
                        
                    </div>

                    <div className="PrdInListItermPage">
                        <ProductCottonUSAInHomePage InformationPrd={info6}></ProductCottonUSAInHomePage>
                        
                    </div>

                    <div className="PrdInListItermPage">
                        <ProductCottonUSAInHomePage InformationPrd={info6}></ProductCottonUSAInHomePage>
                        
                    </div>
                </div>
            </div>
            <div>
                <EndPageCottonUSA></EndPageCottonUSA>
            </div>
        </div>
    )
}

export default ProductPage;