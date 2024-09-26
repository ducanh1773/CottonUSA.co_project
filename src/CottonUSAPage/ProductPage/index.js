import React from "react";
import HeaderCottonUSA from "../HeaderCottonUSA";
import EndPageCottonUSA from "../endPage";
import "./index.css"
import ProductCottonUSAInHomePage from "../HomePageCottonUSA/ProductInHomePage"
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function ProductPage() {
    const info1 = [{ imgUrl1: "https://cottonusa.co/cdn/shop/files/1_6.jpg?v=1696431420&width=800", name: "MLB Los Angeles Dodgers Logo Red T-Shirt", price: '119.000' }]
    
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
                        <Link to="/products"><ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        </Link>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                    </div>
                    <div className="PrdInListItermPage">
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
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