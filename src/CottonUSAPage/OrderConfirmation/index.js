import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import { useHistory } from "react-router-dom";
function OrderConfirmation({ cartId }) {
  const [productIds, setProductIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [shippingFee, setShippingFee] = useState(null);
  const [detailedProducts, setDetailedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const fetchProductsInCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("Bạn chưa đăng nhập.");
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:80/api/cart/items`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setProducts(response.data); // Set array of product IDs
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
          axios
            .get(`http://localhost:80/api/products/findProduct/${productId}`)
            .then((response) => response.data)
            .catch((error) => {
              console.error(`Error fetching product ${productId}:`, error);
              return null; // Return null if there's an error fetching the product
            })
        )
      );
      const filteredProducts = detailed.filter((product) => product); // Filter out nulls
      setDetailedProducts(filteredProducts); // Set detailed products

      // Calculate total price
      const total = filteredProducts.reduce(
        (sum, product) => sum + product.priceProduct, // Summing the price of each product
        0
      );
      setTotalPrice(total); // Update total price state
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Không thể lấy thông tin chi tiết sản phẩm.");
    }
  };

  if (products.length) {
    fetchProductDetails();
  }
}, [products]);

  // Hàm tính phí ship
  const calculateShipping = async (address) => {
    if (!address || address.trim() === "") {
      setShippingFee(null); // Xóa phí ship nếu địa chỉ không hợp lệ
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
    calculateShipping(customerInfo.address); // Gọi hàm mỗi khi địa chỉ thay đổi
  }, [customerInfo.address]);
  
    useEffect(() => {
    const isComplete =
      customerInfo.name &&
      customerInfo.address &&
      customerInfo.phone &&
      customerInfo.email;
    setIsButtonEnabled(isComplete); // Cập nhật trạng thái nút
  }, [customerInfo]);

  // Gọi tính phí ship khi địa chỉ thay đổi
  useEffect(() => {
    if (customerInfo.address) {
      calculateShipping(customerInfo.address);
    }
  }, [customerInfo.address]);

  // Lấy chi tiết sản phẩm từ product IDs
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productPromises = productIds.map((id) =>
          axios.get(`http://localhost:80/api/products/findProduct/${id}`).then(
            (response) => response.data
          )
        );
        const productsData = await Promise.all(productPromises);
        setProducts(productsData);

        // Tính tổng giá tiền
        const total = productsData.reduce(
          (sum, product) => sum + product.priceProduct,
          0
        );
        setTotalPrice(total); // Cập nhật tổng giá
      } catch (error) {
        setError("Không thể lấy thông tin chi tiết sản phẩm.");
        console.error(error);
      }
    };

    if (productIds.length > 0) {
      fetchProductDetails();
    }
  }, [productIds]);

  // Xử lý khi nhập thông tin khách hàng
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  

  const handlePlaceOrder = async () => {
    setIsLoading(true); // Start loading
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn chưa đăng nhập.");
        setIsLoading(false);
        return;
      }
  
      const orderData = {
        total_price: totalPrice + (shippingFee || 0),
        quantity: products.length,
        product_ids: products.map((product) => product.id), // Ensure this is correct
        customer_info: customerInfo,
        payment_method: customerInfo.payment_method,
        orderDetails: detailedProducts.map((product) => ({
          price: product.priceProduct,
          productId: product.id,
          quantity: 1, // or the quantity you want to order
          total: product.priceProduct // assuming total is just price for 1 item
        }))
      };
   
      console.log(totalPrice)
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
        // Optionally clear input fields or redirect
      } else {
        setError("Đặt hàng không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      console.log(errorMessage)
      setError("Không thể đặt hàng. Lỗi: " + errorMessage);
      console.error(error);
    } finally {
      setIsLoading(false); // End loading
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
          disabled={!isButtonEnabled} // Nút chỉ khả dụng khi đủ thông tin
          style={{
            backgroundColor: isButtonEnabled ? "#28a745" : "gray",
            color: "white",
            cursor: isButtonEnabled ? "pointer" : "not-allowed"
          }}
        >
          Đặt Hàng
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
