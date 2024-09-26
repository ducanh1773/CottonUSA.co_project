import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { InformationPrd } from "../../cottonUSAReuse";

function ItemShoppingCart(props) {
  const [value, setValue] = useState(1); // Default value set to 1
  const [sumPrice, setSumPrice] = useState(119000); // Initial sumPrice
  const [showPrd , setShowPrd ]  = useState(true);
  const handleInputChange = (event, price) => {
    const newValue = event.target.value;
    setValue(newValue);

    // Recalculate the sum price when value changes
    setSumPrice(newValue * price);                                                                                                                                                                                                                                                                                                                                       
  };

  const  handleClickDeletePrd = () =>{
    
    setShowPrd(false);
  }

  const Information = props.InformationPrd.map((t) => (
    <div className="allItemObjectShoppingCart" key={t.id}>
      <div className="oneItermPrdOfItemObjectShoppingCart">
        <div className="imgOfShoppingCart">
          <img src={t.imgUrl1} alt={t.name} />
        </div>
        <div className="mainRightOfOneItermPrdOfItemObjectShoppingCart">
          <div className="namePrdOfItemObjectShoppingCart">
            <Link>
              <h4>{t.name}</h4>
            </Link>
          </div>
          <div className="pricePrdOfItemObjectShoppingCart">
            <p>{t.price}đ</p>
          </div>
          <div className="sizePrdOfItemObjectShoppingCart">
            <p>{t.size}</p>
          </div>
        </div>
      </div>
      <div className="numberPrdOfItemObjectShoppingCart">
        <form>
          <input
            type="number"
            value={value}
            onChange={(event) => handleInputChange(event, t.price)}
            min="1" // Ensure the quantity is at least 1
          />
          <p onClick={handleClickDeletePrd}>Gỡ bỏ</p>
        </form>
      </div>
      <div>
        <p>{sumPrice}đ</p> {/* Display updated sumPrice */}
      </div>
    </div>
  ));


  return <div style={{ display: "flex" }}>
    {showPrd&&<div>
    {Information}
    </div>}
    </div>;
}

export default ItemShoppingCart;
