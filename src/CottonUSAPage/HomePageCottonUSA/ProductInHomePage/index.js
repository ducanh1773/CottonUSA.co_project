import React from "react";
import { cottonUSAProduct } from "../../cottonUSAReuse";
import "./index.css"
function ProductCottonUSAInHomePage(props) {
    const Information = props.InformationPrd.map((t) => {
        return (
            <div className="allItermOnPrdCottonUSA">
                <div className="priceReduceCottonUSA">
                    <p>Tiết kiệm 68%</p>
                </div>
                <div className="imgPrdOnHomePageCottonUSA">
                    <img src={t.imgUrl1}></img>
                </div>
                <div className="namePrdHomePageCottonUSA">
                    <h4>{t.name}</h4>
                </div>
                <div className="pricePrdCottonUSA">
                    <p>{t.price}đ</p>
                </div>
            </div>
        )
    })
    return (
        <div style={{display:'flex'}}>
            {Information}
        </div>
    )
}

export default ProductCottonUSAInHomePage;

