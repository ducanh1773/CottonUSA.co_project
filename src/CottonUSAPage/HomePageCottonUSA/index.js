import React from "react";
import HeaderCottonUSA from "../HeaderCottonUSA";
import "./index.css"
import ProductCottonUSAInHomePage from "./ProductInHomePage"
import EndPageCottonUSA from "../endPage";
import { Route , Link } from "react-router-dom";
import axios from "axios";
import{ useState, useEffect } from 'react';
function HomePageCottonUSA() {
    const [info1, setInfo1] = useState([
        { 
          imgUrl1: "https://cottonusa.co/cdn/shop/files/1_6.jpg?v=1696431420&width=800", 
          name: "MLB Los Angeles Dodgers Logo Red T-Shirt", 
          price: '119.000' 
        }
      ]);
    
      // Sử dụng useEffect để fetch dữ liệu khi component được render
      useEffect(() => {
        fetch('http://localhost:80/api/products')
          .then(response => response.json()) // Convert response to JSON
          .then(data => {
            console.log(data); // Log the received data for debugging
        
            // Kiểm tra xem dữ liệu có phải là một mảng và không rỗng
            if (Array.isArray(data) && data.length > 0) {
              // Chuyển đổi dữ liệu sang cấu trúc của info1
              const updatedProducts = data.map(product => ({
                imgUrl1: product.img_product, // Sử dụng key phù hợp từ phản hồi API
                name: product.nameProduct,
                price: product.priceProduct
              }));
        
              // Cập nhật state với dữ liệu mới
              setInfo1(updatedProducts);
            } else {
              console.log('No products found');
            }
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          });
      }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component được mount

      const [info2, setInfo2] = useState([
        { 
          imgUrl1: "https://cottonusa.co/cdn/shop/files/1_6.jpg?v=1696431420&width=800", 
          name: "MLB Los Angeles Dodgers Logo Red T-Shirt", 
          price: '119.000' 
        }
      ]);
    
      // Sử dụng useEffect để fetch dữ liệu khi component được render
      useEffect(() => {
        fetch('http://localhost:80/api/products')
          .then(response => response.json()) // Convert response to JSON
          .then(data => {
            console.log(data); // Log the received data for debugging
        
            // Kiểm tra xem dữ liệu có phải là một mảng và không rỗng
            if (Array.isArray(data) && data.length > 0) {
              // Chuyển đổi dữ liệu sang cấu trúc của info1
              const updatedProducts = data.map(product => ({
                imgUrl1: product.img_product, // Sử dụng key phù hợp từ phản hồi API
                name: product.nameProduct,
                price: product.priceProduct,
                category_id: 2 
              }));
        
              // Cập nhật state với dữ liệu mới
              setInfo2(updatedProducts);
            } else {
              console.log('No products found');
            }
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          });
      }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component được mount

      const [info3, setInfo3] = useState([
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
              }));
    
              // Cập nhật state với dữ liệu mới
              setInfo3(updatedProducts);
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
            <div className="HeaderOnHomePageCottonUSA">
                <HeaderCottonUSA></HeaderCottonUSA>
            </div>
            <div className="imgOnHomePage">
                <img src="https://cottonusa.co/cdn/shop/files/photo1699157561.jpg?v=1699165676&width=2000"></img>
            </div>
            <div className="allItermPrdInHomePage">
                <div>
                    <h1>
                        MLB T-SHIRT
                    </h1>
                    <div className="itermPrdHomePageCottonUSA">
                        <ProductCottonUSAInHomePage InformationPrd={info3} />
                    </div>
                </div>
                <div>
                    <h1>
                        NBA T-Shirts
                    </h1>
                    <div className="itermPrdHomePageCottonUSA">
                        <ProductCottonUSAInHomePage InformationPrd={info3}></ProductCottonUSAInHomePage>
                    </div>
                   
                </div>

                <div>
                    <h1>
                        Beer Brands
                    </h1>
                    <div className="itermPrdHomePageCottonUSA">
                        <ProductCottonUSAInHomePage InformationPrd={info3}></ProductCottonUSAInHomePage>
                    </div>
                </div>
                <div>
                    <h1>
                        Khói Collection
                    </h1>
                    <div className="itermPrdHomePageCottonUSA">
                        <ProductCottonUSAInHomePage InformationPrd={info3}></ProductCottonUSAInHomePage>
                    </div>
                    <div className="itermPrdHomePageCottonUSA">
                        <ProductCottonUSAInHomePage InformationPrd={info3}></ProductCottonUSAInHomePage>
                    </div>
                </div>
            </div>
            <div>
                <EndPageCottonUSA></EndPageCottonUSA>
            </div>
        </div>
    )
}

export default HomePageCottonUSA;
