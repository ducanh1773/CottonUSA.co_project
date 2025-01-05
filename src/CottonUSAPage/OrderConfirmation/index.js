import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";  // Thêm thư viện jwt-decode
import "./index.css";
import { useNavigate } from 'react-router-dom';

function OrderConfirmation({ cartId }) {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    shipping_address: "",
    payment_method: "", // Thêm trường payment_method
  });
  const [error, setError] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [shippingFee, setShippingFee] = useState(null);
  const [detailedProducts, setDetailedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    const fetchProductsInCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn chưa đăng nhập.");
        return;
      }

      try {
         // Lấy customerId từ token
         const decodedToken = jwtDecode(token);
         console.log(decodedToken);
         const email = decodedToken.sub; // Lấy customerId từ token
         console.log(email);
         console.log("Token being sent: ", token);

        const response = await axios.get(`http://localhost:80/api/cart/items`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Không thể lấy thông tin giỏ hàng.");
      }
    };

    fetchProductsInCart();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const detailed = await Promise.all(
          products.map((productId) =>
            axios.get(`http://localhost:80/api/products/findProduct/${productId}`)
              .then((response) => response.data)
              .catch((error) => {
                console.error(`Error fetching product ${productId}:`, error);
                return null;
              })
          )
        );
        const filteredProducts = detailed.filter((product) => product);
        setDetailedProducts(filteredProducts);

        const total = filteredProducts.reduce(
          (sum, product) => sum + product.priceProduct, 
          0
        );
        setTotalPrice(total);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Không thể lấy thông tin chi tiết sản phẩm.");
      }
    };

    if (products.length) {
      fetchProductDetails();
    }
  }, [products]);

  const calculateShipping = async (address) => {
    if (!address || address.trim() === "") {
      setShippingFee(null);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:80/api/cart/shipping/calculate",
        { address }
      );
      setShippingFee(response.data.shippingFee);
    } catch (error) {
      console.error("Lỗi khi tính phí ship:", error);
      setShippingFee(null);
    }
  };

  useEffect(() => {
    calculateShipping(customerInfo.address);
  }, [customerInfo.address]);

  useEffect(() => {
    const isComplete =
      customerInfo.name &&
      customerInfo.address &&
      customerInfo.phone &&
      customerInfo.email &&
      customerInfo.shipping_address &&
      customerInfo.payment_method; // Kiểm tra payment_method
    setIsButtonEnabled(isComplete);
  }, [customerInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn chưa đăng nhập.");
        setIsLoading(false);
        return;
      }

      const decodedToken = jwtDecode(token);
      console.log("dedec"+decodedToken)
      const customerId = decodedToken.customerId; // Lấy customerId từ token
      console.log(customerId)
      const orderData = {
        totalPrice: totalPrice + (shippingFee || 0),
        quantity: products.length,
        product_ids: products.map((product) => product.id),
        customer_info: customerInfo,
        paymentMethod: customerInfo.payment_method,
        shippingAddress: customerInfo.shipping_address,
        userId: customerId, // Sử dụng customerId đã lấy từ token
        orderDetails: detailedProducts.map((product) => ({
          price: product.priceProduct,
          productId: product.id,
          quantity: 1,
          total: product.priceProduct,
        })),
      };
      console.log("Order Data:", orderData);

      const response = await axios.post(
        "http://localhost:80/api/order/create",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Đặt hàng thành công!");
        history.push("/");
      } else {
        setError("Đặt hàng không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      console.log(errorMessage);
      setError("Không thể đặt hàng. Lỗi: " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  if (error) return <div>{error}</div>;

  return (
    <div className="order-confirmation">
      <h1>Xác nhận Đặt hàng</h1>
      <div className="orderInformationSucces">
        <div className="product-list">
          {detailedProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.img_product} alt={product.nameProduct} />
              <h4>{product.nameProduct}</h4>
              <p>Giá: {product.priceProduct}đ</p>
              <p>
                Kích thước:{" "}
                {product.skus?.[0]?.size_attribute_id === 0
                  ? "L"
                  : product.skus?.[0]?.size_attribute_id
                  ? "M"
                  : "Không có"}
              </p>
              <p>
                Màu sắc:{" "}
                {product.skus?.[0]?.color_attribute_id === 0
                  ? "Trắng"
                  : product.skus?.[0]?.color_attribute_id
                  ? "Đen"
                  : "Không có"}
              </p>
            </div>
          ))}
        </div>
        <div className="informationCustomer">
          <h2>Thông tin khách hàng</h2>
          <input
            type="text"
            placeholder="Tên"
            name="name"
            value={customerInfo.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            name="address"
            value={customerInfo.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            name="phone"
            value={customerInfo.phone}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={customerInfo.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Phương thức thanh toán"
            name="payment_method"
            value={customerInfo.payment_method}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Địa chỉ giao hàng"
            name="shipping_address"
            value={customerInfo.shipping_address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {shippingFee !== null && (
            <div>
              <h4>Phí ship: {shippingFee}đ</h4>
            </div>
          )}
          <div className="order-total">
            <h3>Tổng số tiền sản phẩm: {totalPrice}đ</h3>
          </div>
          <div className="order-total">
            <h3>
              Tổng số tiền (bao gồm ship): {totalPrice + (shippingFee || 0)}đ
            </h3>
          </div>
        </div>
        <button
          onClick={handlePlaceOrder}
          id="submitButton"
          disabled={!isButtonEnabled}
          style={{
            backgroundColor: isButtonEnabled ? "#28a745" : "gray",
            color: "white",
            cursor: isButtonEnabled ? "pointer" : "not-allowed",
          }}
        >
          Đặt Hàng
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;