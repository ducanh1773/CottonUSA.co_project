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

    // useEffect(() => {
    //     const updateQuantity = async () => {
    //         if (!showPrd) return; // Không gửi yêu cầu nếu sản phẩm đã bị xóa

    //         try {
    //             const token = localStorage.getItem('token');
    //             await axios.put(`http://localhost:80/api/cart/updateQuantity`, {
    //                 productId: props.InformationPrd.id,
    //                 quantity: value,
    //                 sizeAttributeId: props.InformationPrd.size,
    //                 colorAttributeId: props.InformationPrd.color
    //             }, {
    //                 headers: { Authorization: `Bearer ${token}` }
    //             });
    //             setError(null); // Clear any previous error
    //         } catch (error) {
    //             console.error("Error updating quantity:", error);
    //             setError("Không thể cập nhật số lượng. Vui lòng thử lại.");
    //         }
    //     };
        

    //     const debounceTimeout = setTimeout(updateQuantity, 500); // 500ms delay
    //     return () => clearTimeout(debounceTimeout); // Clear timeout if value changes
    // }, [value, props.InformationPrd.id, showPrd]);
    

    const handleClickDeletePrd = async () => {
        if (window.confirm("Bạn có chắc chắn muốn gỡ bỏ sản phẩm này không?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:80/api/cart/items/${props.InformationPrd.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setShowPrd(false);
                setError(null); // Clear any previous error
            } catch (error) {
                console.error("Error removing product:", error);
                setError("Không thể gỡ bỏ sản phẩm. Vui lòng thử lại.");
            }
        }
    };

    return showPrd ? (
        <div className="allItemObjectShoppingCart">
            <div>
                <input type="checkbox" name=""></input>
            </div>
            <div className="oneItemPrdOfItemObjectShoppingCart">
                <div className="imgOfShoppingCart">
                    <img src={props.InformationPrd.imgUrl1} alt={props.InformationPrd.name} />
                </div>
                <div className="mainRightOfOneItemPrdOfItemObjectShoppingCart">
                    <div className="namePrdOfItemObjectShoppingCart">
                        <Link to={`/product/${props.InformationPrd.id}`}>
                            <h4>{props.InformationPrd.name}</h4>
                        </Link>
                    </div>
                    <div className="pricePrdOfItemObjectShoppingCart">
                        <p>{props.InformationPrd.price}đ</p>
                    </div>
                    <div className="sizePrdOfItemObjectShoppingCart">
                        <p>{props.InformationPrd.size || "Không có kích thước"}</p>
                    </div>
                    <div className="colorPrdOfItemObjectShoppingCart">
                        <p>{props.InformationPrd.color || "Không có màu"}</p>
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