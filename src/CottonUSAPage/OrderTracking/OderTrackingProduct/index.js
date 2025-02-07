import React from "react";
import "./index.css";

function OrderTrackingProduct(props) {
  const { id, imgUrl1, name, quantity, price, total } = props.InformationPrd;

  return (
    <div className="all_item_on_ordertracking_product">
      <div className="img_item_on_ordertyracking">
        <img src={imgUrl1} alt={name} />
      </div>
      <div className="namePriceAndQuantityInTrackingOrder">
        <div>
          <h3>{name}</h3>
          <h4>Quantity: {quantity}</h4>
          <h4>Price: {price}</h4>
        </div>
      </div>
      <div className="sumPriceAllItem">
        <h3>Total: {total}</h3>
      </div>
    </div>
  );
}

export default OrderTrackingProduct;