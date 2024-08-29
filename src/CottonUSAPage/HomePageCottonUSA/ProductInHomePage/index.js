import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function ProductCottonUSAInHomePage(props) {
  const Information = props.InformationPrd.map((t) => {
    return (
      <div className="allItermOnPrdCottonUSA" key={t.id}>
        <div className="priceReduceCottonUSA">
          <p>Tiết kiệm 68%</p>
        </div>
        <div className="imgPrdOnHomePageCottonUSA">
          {/* Sử dụng Link để điều hướng đến trang chi tiết của sản phẩm */}
          <Link to={`/products/${t.id}`}>
            <img src={t.imgUrl1} alt={t.name} />
          </Link>
        </div>
        <div className="namePrdHomePageCottonUSA">
          {/* Sử dụng Link để điều hướng đến trang chi tiết của sản phẩm */}
          <Link to={`/products/${t.id}`}>
            <h4>{t.name}</h4>
          </Link>
        </div>
        <div className="pricePrdCottonUSA">
          <p>{t.price}đ</p>
        </div>
      </div>
    );
  });

  return <div style={{ display: "flex" }}>{Information}</div>;
}

export default ProductCottonUSAInHomePage;
