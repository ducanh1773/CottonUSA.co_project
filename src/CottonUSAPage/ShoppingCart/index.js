import React from "react";
import "./index.css"
import HeaderCottonUSA from "../HeaderCottonUSA";
import ItemShoppingCart from "./ItemShoppingCart/index";
import { useState } from "react";
function ShoppingCart(){
    const [info6, setInfo6] = useState([
        {
          imgUrl1: "https://cottonusa.co/cdn/shop/files/1_6.jpg?v=1696431420&width=800",
          name: "MLB Los Angeles Dodgers Logo Red T-Shirt",
          price: "119.000",
          size:"XL"
        
        },

      
      ]);
    return(
        <div>
            <HeaderCottonUSA></HeaderCottonUSA>
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
                <div className="">
                    <div>
                    <ItemShoppingCart InformationPrd={info6}></ItemShoppingCart>
                    </div>
                   
                </div>
             </div>
             <div className="mainRightShoppingCart">
                    <h3>Tổng phụ : 119.000</h3>
                    <h2>Tổng cộng : 119.000</h2>
                    <textarea placeholder="Ghi chú đặt hàng"></textarea>
                    
             </div>
            </div>


        </div>
    )
}

export default ShoppingCart;