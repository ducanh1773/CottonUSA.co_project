import React, { useState, useEffect } from "react";
import "./index.css";
import HeaderCottonUSA from "../HeaderCottonUSA";
import EndPageCottonUSA from "../endPage";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ImageGallery from "react-image-gallery";
import "@splidejs/splide/css/sea-green";
import "react-image-gallery/styles/css/image-gallery.css";
import { Link, useParams } from "react-router-dom";
import ProductCottonUSAInHomePage from "../HomePageCottonUSA/ProductInHomePage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
function ProductDetailCottonUSA() {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [value, setValue] = useState(1);
  const [showPrevervs, setShowPrevevs] = useState(false);
  const [showShip, setShowShip] = useState(false);
  const [returnProduct, setReturnProduct] = useState(false);
  const [product, setProduct] = useState(null); // Trạng thái để lưu sản phẩm chi tiết
  const [selectedColor, setSelectedColor] = useState("");
  const [availableColors, setAvailableColors] = useState([]);
  const [cart, setCart] = useState([]);
  const [availableSize, setAvailableSize] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:80/api/products/findProduct/${id}`)
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => {
        console.log(data); // Debug log
        if (data) {
          setProduct({
            id: data.id,
            imgUrl1: data.img_product,
            name: data.nameProduct,
            price: data.priceProduct,
            description: "Chất liệu: 100% Cotton",
            skus: data.skus
          });
          const colors = data.skus.map((sku) => sku.color_attribute_id);
          setAvailableColors([...new Set(colors)]);

          const sizes = data.skus.map((sku) => sku.size_attribute_id);
          setAvailableSize([...new Set(sizes)]);
        } else {
          console.log("Product not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  const addToCart = async () => {
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in!");
      return;
    }
    try {
      if (selectedColor !== "" && selectedSize !== "") {
        // Lấy token từ localStorage
        const token = localStorage.getItem("token"); // Giả sử token được lưu trong localStorage

        if (!token) {
          alert("You are not logged in!");
          return;
        }
        console.log("Token being sent: ", token);

        // Lấy customerId từ token
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const email = decodedToken.sub; // Lấy customerId từ token
        console.log(email);
        console.log("Token being sent: ", token);

        // Gửi yêu cầu API để thêm sản phẩm vào giỏ hàng
        const response = await axios.post(
          `http://localhost:80/api/cart/add/${product.id}?quantity=${value}&sizeAttributeId=${selectedSize}&colorAttributeId=${selectedColor}`,
          {
            productId: product.id,
            quantity: value, // Sử dụng giá trị quantity từ state
            colorAttributeId: selectedColor,
            sizeAttributeId: selectedSize,
            img_product: product.imgUrl1,
            price: product.price
          },
          {
            headers: {
              Authorization: `Bearer ${token}` // Thêm token vào header
            }
          }
        );
        console.log(typeof product.id);

        console.log(response.data);
        setCart(response.data); // Cập nhật lại giỏ hàng từ response
        alert("Product added to cart successfully!");
      } else {
        alert("Bạn chưa chọn size hoặc màu");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Không thêm được sản phẩm vào giỏ hàng.");
    }
  };

  // Hàm để xử lý khi nhấp vào màu
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const [selectedSize, setSelectedSize] = useState("");

  // Hàm để xử lý khi nhấp vào size
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  console.log(id);
  //

  const addProduct = () => {
    setValue(value + 1);
  };

  const minusValue = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handleClickToshowPrevers = () => {
    setShowPrevevs(!showPrevervs);
  };

  const hadlecClickToshowShip = () => {
    setShowShip(!showShip);
  };

  const handlecClickToShowReturnProduct = () => {
    setReturnProduct(!returnProduct);
  };

  if (!product) {
    return <div>Sản phẩm không tồn tại hoặc đang tải...</div>;
  }

  console.log(selectedColor);

  const images = [
    {
      original: product.imgUrl1,
      thumbnail: product.imgUrl1
    }
    // Thêm nhiều hình ảnh hơn nếu cần
  ];
  return (
    <div>
      <HeaderCottonUSA />
      <div className="fullImageProductDetail">
        <div className="imgProductDetail">
          <ImageGallery
            items={images}
            thumbnailPosition="left"
            showPlayButton={false}
            showBullets={false}
            showFullscreenButton={true}
          />
        </div>
        <div className="MainRightProductdetail">
          <div className="subjectAndPrice">
            <h1>{product.name}</h1>
          </div>
          <div className="PriceIterm">
            <p className="priceAfterReduce">{product.price}đ</p>
            <p className="priceBeforeReduce">370.000đ</p>
            <p className="TichKiem">Tiết kiệm 68%</p>
          </div>
          <div className="OptionColor">
            <p>Màu:</p>
            <p>{selectedColor}</p>
          </div>

          {availableColors.map((colorId) => {
            const colorName =
              colorId === 2 ? "Trắng" : colorId === 1 ? "Đen" : colorId;
            return (
              <p
                key={colorId}
                onClick={() => handleColorClick(colorId)}
                style={{
                  border:
                    selectedColor === colorId
                      ? "3px solid black"
                      : "1px solid black",
                  padding: "10px",
                  cursor: "pointer",
                  marginRight: "20px"
                }}
              >
                Màu: {colorName}
              </p>
            );
          })}

          <div className="OptionColor">
            <p>Cỡ:</p>
            <p>{selectedSize}</p>
          </div>

          {availableSize.map((sizeId) => {
            const sizeLabel = sizeId === 2 ? "L" : sizeId === 1 ? "M" : sizeId;
            return (
              <p
                key={sizeId}
                onClick={() => handleSizeClick(sizeId)}
                style={{
                  border:
                    selectedSize === sizeId
                      ? "3px solid black"
                      : "1px solid black",
                  padding: "10px",
                  cursor: "pointer",
                  marginRight: "20px"
                }}
              >
                Cỡ: {sizeLabel}
              </p>
            );
          })}

          <div className="OptionColor">
            <p>Số lượng :</p>
          </div>
          <div className="quantityBuyProduct">
            <div className="borderQuantityBuyProduct">
              <button onClick={minusValue}>-</button>
              <input value={value} readOnly />
              <button onClick={addProduct}>+</button>
            </div>
          </div>
          <div className="buttonToShoppingCart">
            <button onClick={() => addToCart(1, product.id, product.price)}>
              Thêm vào giỏ hàng
            </button>
          </div>
          <div className="introduceProductDetail">
            <p>Product ID: DN036MUN</p>
            <p>{product.description}</p>
            <p>Kiểu dáng áo T-shirt phom rộng thoải mái, năng động</p>
            <p>Thiết kế lấy cảm hứng từ hiệp hội bóng chày MLB</p>
            <p>Chất vải mềm mịn và thấm hút tốt</p>
            <p>
              Gam màu hiện đại dễ dàng phối với nhiều trang phục và phụ kiện
            </p>
          </div>
          <div>
            <div
              className="itermPolicyProduct"
              onClick={handleClickToshowPrevers}
            >
              <div className="policyProduct">
                <h4>Bảo quản</h4>
                <box-icon
                  name="down-arrow-circle"
                  type="solid"
                  flip="horizontal"
                  color="#c5c5c5"
                ></box-icon>
              </div>
              {showPrevervs && (
                <div className="informationProduct">
                  <p>
                    Để bảo quản sản phẩm đúng cách, luôn mới và bền đẹp thì bạn
                    nên giặt ở nhiệt độ thấp, sử dụng các chế độ vắt nhẹ nhàng
                    sẽ có lợi hơn cho sản phẩm, giúp duy trì màu sắc, hình dạng
                    và cấu trúc của vải.
                  </p>
                  <li>Không sử dụng nước tẩy / thuốc tẩy</li>
                  <li>Lộn trái sản phẩm khi giặt và phơi</li>
                  <li>Tránh phơi dưới ánh nắng trực tiếp</li>
                </div>
              )}
            </div>
            <div className="itermPolicyProduct" onClick={hadlecClickToshowShip}>
              <div className="policyProduct">
                <h4>Chính sách giao hàng</h4>
                <box-icon
                  name="down-arrow-circle"
                  type="solid"
                  flip="horizontal"
                  color="#c5c5c5"
                ></box-icon>
              </div>
              {showShip && (
                <div className="informationProduct">
                  <p>Giao hàng nhanh toàn quốc từ 1-5 ngày tùy khu vực.</p>
                </div>
              )}
            </div>
            <div
              className="itermPolicyProduct"
              onClick={handlecClickToShowReturnProduct}
            >
              <div className="policyProduct">
                <h4>Chính sách đổi trả</h4>
                <box-icon
                  name="down-arrow-circle"
                  type="solid"
                  flip="horizontal"
                  color="#c5c5c5"
                ></box-icon>
              </div>
              {returnProduct && (
                <div>
                  <p>
                    Nhằm mang lại cho bạn sự tiện lợi và những trải nghiệm tuyệt
                    vời khi mua hàng, chúng tôi đã phát triển dịch vụ đổi hàng
                    tận nơi và chính sách bảo hành.
                  </p>
                  <p>
                    Tham khảo thêm thông tin về chính sách{" "}
                    <Link
                      to="/Chinh-sach-doi-tra-va-bao-hanh"
                      className="PreversItermLink"
                    >
                      tại đây
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="moreItermOnProductDetail">
        <div>
          <h1>Có thể bạn sẽ thích</h1>
        </div>
        <div className="itermPrdHomePageCottonUSA">
          <ProductCottonUSAInHomePage
            InformationPrd={[product]}
          ></ProductCottonUSAInHomePage>
        </div>
      </div>
      <div className="moreItermOnProductDetail">
        <div>
          <h1>Sản phẩm đã xem gần đây</h1>
        </div>
        <div className="itermPrdHomePageCottonUSA">
          <ProductCottonUSAInHomePage
            InformationPrd={[product]}
          ></ProductCottonUSAInHomePage>
        </div>
      </div>
      <EndPageCottonUSA />
    </div>
  );
}

export default ProductDetailCottonUSA;
