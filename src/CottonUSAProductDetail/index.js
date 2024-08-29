import React, { useState, useEffect } from "react";
import "./index.css";
import HeaderCottonUSA from "../CottonUSAPage/HeaderCottonUSA";
import EndPageCottonUSA from "../CottonUSAPage/endPage";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ImageGallery from "react-image-gallery";
import "@splidejs/splide/css/sea-green";
import "react-image-gallery/styles/css/image-gallery.css";
import { Link, useParams } from "react-router-dom";
import ProductCottonUSAInHomePage from "../CottonUSAPage/HomePageCottonUSA/ProductInHomePage";

function ProductDetailCottonUSA() {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [value, setValue] = useState(1);
  const [showPrevervs, setShowPrevevs] = useState(false);
  const [showShip, setShowShip] = useState(false);
  const [returnProduct, setReturnProduct] = useState(false);
  const [product, setProduct] = useState(null); // Trạng thái để lưu sản phẩm chi tiết

 console.log(id);
  useEffect(() => {
    fetch(`http://localhost:80/api/products/findProduct/${id}`)
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => {
        console.log(data); // Debug log
        if (data) {
          setProduct({
            imgUrl1: data.img_product,
            name: data.nameProduct,
            price: data.priceProduct,
            description: "Chất liệu: 100% Cotton", // Bạn có thể tùy chỉnh theo dữ liệu thực tế
          });
        } else {
          console.log("Product not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

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

  const images = [
    {
      original: product.imgUrl1,
      thumbnail: product.imgUrl1,
    },
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
            <p>Trắng</p>
          </div>
          <div className="OptionItermColor">
            <p>Đen</p>
            <p>Trắng</p>
          </div>
          <div className="OptionColor">
            <p>Cỡ:XL</p>
          </div>
          <div className="OptionItermColor">
            <p>M</p>
            <p>L</p>
            <p>XL</p>
          </div>
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
            <button>Thêm vào giỏ hàng</button>
          </div>
          <div className="introduceProductDetail">
            <p>Product ID: DN036MUN</p>
            <p>{product.description}</p>
            <p>Kiểu dáng áo T-shirt phom rộng thoải mái, năng động</p>
            <p>Thiết kế lấy cảm hứng từ hiệp hội bóng chày MLB</p>
            <p>Chất vải mềm mịn và thấm hút tốt</p>
            <p>Gam màu hiện đại dễ dàng phối với nhiều trang phục và phụ kiện</p>
          </div>
          <div>
            <div className="itermPolicyProduct" onClick={handleClickToshowPrevers}>
              <div className="policyProduct">
                <h4>Bảo quản</h4>
                <box-icon name="down-arrow-circle" type="solid" flip="horizontal" color="#c5c5c5"></box-icon>
              </div>
              {showPrevervs && (
                <div className="informationProduct">
                  <p>
                    Để bảo quản sản phẩm đúng cách, luôn mới và bền đẹp thì bạn nên giặt ở nhiệt độ thấp, sử dụng các chế độ vắt nhẹ nhàng sẽ có lợi hơn cho sản phẩm, giúp duy trì màu sắc, hình dạng và cấu trúc của vải.
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
                <box-icon name="down-arrow-circle" type="solid" flip="horizontal" color="#c5c5c5"></box-icon>
              </div>
              {showShip && (
                <div className="informationProduct">
                  <p>Giao hàng nhanh toàn quốc từ 1-5 ngày tùy khu vực.</p>
                </div>
              )}
            </div>
            <div className="itermPolicyProduct" onClick={handlecClickToShowReturnProduct}>
              <div className="policyProduct">
                <h4>Chính sách đổi trả</h4>
                <box-icon name="down-arrow-circle" type="solid" flip="horizontal" color="#c5c5c5"></box-icon>
              </div>
              {returnProduct && (
                <div>
                  <p>
                    Nhằm mang lại cho bạn sự tiện lợi và những trải nghiệm tuyệt vời khi mua hàng, chúng tôi đã phát triển dịch vụ đổi hàng tận nơi và chính sách bảo hành.
                  </p>
                  <p>
                    Tham khảo thêm thông tin về chính sách{" "}
                    <Link to="/Chinh-sach-doi-tra-va-bao-hanh" className="PreversItermLink">
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
          <ProductCottonUSAInHomePage InformationPrd={[product]}></ProductCottonUSAInHomePage>
        </div>
      </div>
      <div className="moreItermOnProductDetail">
        <div>
          <h1>Sản phẩm đã xem gần đây</h1>
        </div>
        <div className="itermPrdHomePageCottonUSA">
          <ProductCottonUSAInHomePage InformationPrd={[product]}></ProductCottonUSAInHomePage>
        </div>
      </div>
      <EndPageCottonUSA />
    </div>
  );
}

export default ProductDetailCottonUSA;
