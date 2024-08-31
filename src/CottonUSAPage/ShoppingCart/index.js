import React from "react";
import "./index.css"
import HeaderCottonUSA from "../HeaderCottonUSA";
function ShoppingCart(){
    return(
        <div>
            <HeaderCottonUSA></HeaderCottonUSA>
            <div className="subjectShoppingCart">
                <h1>Giỏ hàng</h1>
            </div>
            <div className="">
             <div className="">
                <h4>Sản phẩm</h4>
                <h4>Số lượng</h4>
                <h4>Tổng cộng</h4>
             </div>
             <div>
                    <h3>Tổng phụ</h3>
                    <h2>Tổng cộng</h2>
                    <textarea placeholder="Ghi chú đặt hàng"></textarea>
             </div>
            </div>


        </div>
    )
}

export default ShoppingCart;