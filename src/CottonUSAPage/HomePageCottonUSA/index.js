import React from "react";
import HeaderCottonUSA from "../HeaderCottonUSA";
import "./index.css"
import ProductCottonUSAInHomePage from "./ProductInHomePage"
import EndPageCottonUSA from "../endPage";
import { Route , Link } from "react-router-dom";
function HomePageCottonUSA() {
    const info1 = [{ imgUrl1: "https://cottonusa.co/cdn/shop/files/1_6.jpg?v=1696431420&width=800", name: "MLB Los Angeles Dodgers Logo Red T-Shirt", price: '119.000' }]
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
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                    </div>
                </div>
                <div>
                    <h1>
                        NBA T-Shirts
                    </h1>
                    <div className="itermPrdHomePageCottonUSA">
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                    </div>
                    <div className="itermPrdHomePageCottonUSA">
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                    </div>
                </div>

                <div>
                    <h1>
                        Beer Brands
                    </h1>
                    <div className="itermPrdHomePageCottonUSA">
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                    </div>
                    <div className="itermPrdHomePageCottonUSA">
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>

                    </div>
                </div>
                <div>
                    <h1>
                        Khói Collection
                    </h1>
                    <div className="itermPrdHomePageCottonUSA">
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                        <ProductCottonUSAInHomePage InformationPrd={info1}></ProductCottonUSAInHomePage>
                    </div>
                    <div className="itermPrdHomePageCottonUSA">
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

export default HomePageCottonUSA;
