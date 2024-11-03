import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import { Link } from "react-router-dom";

function ItemShoppingCart(props) {
  const [value, setValue] = useState(1);
  const [sumPrice, setSumPrice] = useState(props.InformationPrd.price || 0);
  const [showPrd, setShowPrd] = useState(true);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10) || 1;
    setValue(newValue);
    setSumPrice(newValue * props.InformationPrd.price);
  };

  // Debounce quantity update to avoid multiple requests
  useEffect(() => {
    const updateQuantity = async () => {
      try {
        await axios.put(`http://localhost:80/api/cart/1/updateQuantity`, {
          productId: props.InformationPrd.id,
          quantity: value,
        });
        console.log("Quantity updated successfully");
        setError(null); // Clear any previous error
      } catch (error) {
        console.error("Error updating quantity:", error);
        setError("Could not update quantity. Please try again.");
      }
    };

    const debounceTimeout = setTimeout(updateQuantity, 500); // 500ms delay
    return () => clearTimeout(debounceTimeout); // Clear timeout if value changes
  }, [value, props.InformationPrd.id]);

  const handleClickDeletePrd = async () => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      try {
        // Gọi API để xóa sản phẩm khỏi giỏ hàng
        await axios.delete(`http://localhost:80/api/cart/1/items/${props.InformationPrd.id}`);
        console.log("Product removed successfully");

        // Ẩn sản phẩm khỏi giao diện sau khi xóa thành công
        setShowPrd(false);
        setError(null); // Clear any previous error
      } catch (error) {
        console.error("Error removing product:", error);
        setError("Could not remove product. Please try again.");
      }
    }
  };

  const t = props.InformationPrd;

  return showPrd ? (
    <div className="allItemObjectShoppingCart">
      <div>
        <input type="checkbox"></input>
      </div>
      <div className="oneItermPrdOfItemObjectShoppingCart">
        <div className="imgOfShoppingCart">
          <img src={t.imgUrl1} alt={t.name} />
        </div>
        <div className="mainRightOfOneItermPrdOfItemObjectShoppingCart">
          <div className="namePrdOfItemObjectShoppingCart">
            <Link to={`/product/${t.id}`}>
              <h4>{t.name}</h4>
            </Link>
          </div>
          <div className="pricePrdOfItemObjectShoppingCart">
            <p>{t.price}đ</p>
          </div>
          <div className="sizePrdOfItemObjectShoppingCart">
            <p>{t.size || "Không có kích thước"}</p>
          </div>
          <div className="colorPrdOfItemObjectShoppingCart">
            <p>{t.color || "Không có màu"}</p>
          </div>
        </div>
      </div>
      <div className="numberPrdOfItemObjectShoppingCart">
        <form>
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            min="1"
          />
          <p onClick={handleClickDeletePrd} className="removeLink">
            Gỡ bỏ
          </p>
        </form>
      </div>

      <div className="totalPricePrdOfItemObjectShoppingCart">
        <p>Tổng: {sumPrice}đ</p>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  ) : null;
}

export default ItemShoppingCart;
