import React, { useEffect, useState } from "react";
import HeaderCottonUSA from "../HeaderCottonUSA";
import OrderTrackingProduct from "./OderTrackingProduct"; // Ensure this component can handle multiple products
import "./index.css";
import axios from "axios";

function OrderTracking() {
  const [token, setToken] = useState(null);
  const [orderInfo, setOrderInfo] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);
  const [detailedProducts, setDetailedProducts] = useState([]);


  const fetchOrderDetails = async () => {
    if (!token) return;

    try {
      const response = await fetch("http://localhost/api/order/detail", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      console.log("📌 Full API response:", data);

      // Ensure orderDetails is an array of product IDs
      const productIds = Object.values(data)[0] || [];
      setOrderDetails(productIds);
      console.log(productIds);

      // Set orderInfo if available
      setOrderInfo(data.orders || {});
    } catch (error) {
      console.error("❌ Error fetching order details:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    fetchOrderDetails();
  }, [token]);
  const fetchProductDetails = async () => {
    if (orderDetails.length === 0) return;
  
    console.log("Fetching product details for IDs:", orderDetails);
  
    try {
      const detailed = await Promise.all(
        orderDetails.map(async (productId) => {
          try {
            const response = await axios.get(`http://localhost:80/api/products/findProduct/${productId}`);
            return response.data; // Ensure this is the correct structure
          } catch (error) {
            console.error(`Error fetching product ${productId}:`, error);
            return null; // Prevent app crash
          }
        })
      );
  
      // Log the raw detailed responses before filtering
      console.log("Raw detailed product responses:", detailed);
  
      const filteredProducts = detailed.filter(product => product !== null);
      setDetailedProducts(filteredProducts); // Set the filtered products
  
      // Log the detailed products after setting the state
      console.log("Filtered detailed products:", filteredProducts);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [orderDetails]);

  return (
    <div>
      <HeaderCottonUSA />
      <div className="all-item-ordertracking-page">
        <div className="menu_order_tracking">
          <h3>Tất cả</h3>
          <h3>Chờ thanh toán</h3>
          <h3>Vận chuyển</h3>
          <h3>Chờ giao hàng</h3>
          <h3>Hoàn thành</h3>
          <h3>Đã hủy</h3>
          <h3>Trả hàng/Hoàn tiền</h3>
        </div>
        <div className="allItemtrackingpageProduct">
          {detailedProducts.length > 0 ? (
            detailedProducts.map((product) => (
              <OrderTrackingProduct
                key={product.id}
                InformationPrd={{
                  id: product.id,
                  imgUrl1: product.img_product,
                  name: product.nameProduct,
                  quantity: product.quantity, // Ensure quantity is defined
                  price: product.priceProduct,
                  total: product.total || 0, // Ensure total is defined
                  size:
                    product.skus?.[0]?.size_attribute_id === 1
                      ? "M"
                      : product.skus?.[0]?.size_attribute_id === 0
                      ? "L"
                      : "Không có kích thước",
                  color:
                    product.skus?.[0]?.color_attribute_id === 1
                      ? "Trắng"
                      : product.skus?.[0]?.color_attribute_id === 0
                      ? "Đen"
                      : "Không có màu"
                }}
              />
            ))
          ) : (
            <p>No order details available.</p>
          )}
        </div>
      </div>
      <div className="allPriceAndInformationOfOrderTracking">
        <div className="sumPriceOfallPriceAndInformationOfOrderTracking">
          <h2>Tổng tiền: {orderInfo.total_price || 0}</h2>
        </div>
        <div className="dateToTransport">
          <div className="timeToTransport">
            <p>
              Đơn hàng sẽ được vận chuyển trước ngày{" "}
              {orderInfo.created_at || "N/A"}
            </p>
          </div>
          <div className="buttonToRefuseOrContact">
            <button>Liên hệ người bán</button>
            <button>Hủy đơn hàng</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTracking;