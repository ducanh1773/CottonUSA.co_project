import React from "react";
import "./index.css"
import { Link } from "react-router-dom";
function EndPageCottonUSA() {
    return (
        <div className="allEndPageCottonUSA">
            <div className="mainLeftEndPage">
                <img src="https://360.com.vn/wp-content/uploads/2022/06/logo.svg"></img>
                <h2>SIGN UP AND SAVE</h2>
                <p>Đăng ký để nhận ưu đãi đặc biệt , free giveaway và các thông tin khác</p>
                <form className="resistCottonUSA">
                    <input type="text" placeholder="E-mail"></input>
                    <box-icon name='right-arrow-circle' type='solid' color="rgb(57, 57, 57)"></box-icon>
                </form>
                <p>© 2024, COTTON USA.</p>
            </div>
            <div className="informationEndPage">
                <h3>Thông tin</h3>
                <Link to="/AboutUs"><p>About us</p></Link>
                <Link to="/contact"><p>Liên hệ chúng tôi</p></Link>
            </div>
            <div className="supportCustomerEndPage">
                <h3>Hỗ trợ khách hàng</h3>
                <Link to="/Chinh-sach-doi-tra-va-bao-hanh"><p>Chính sách đổi trả và bảo hành</p></Link>
                <Link to="/Chinh-sach-doi-tra-va-bao-hanh"><p>Chính sách vận chuyển</p></Link>
                <Link to="/Điều-khoản-và-dịch-vụ"><p>Điều khoản dịch vụ</p></Link>
                <Link to="/chinh-sach-bảo-mật"><p>Chính sách bảo mật</p></Link>
            </div>
            <div className="contactCottonUSA">
                <h3>Dịch vụ khách hàng</h3>
                <p>Hotline: 0326171986</p>
                <p>Email: support@cottonusa.co</p>
                <p>Thứ Hai - Chủ nhật</p>
                <p>08:00 ~ 22:00    </p>
            </div>
        </div>
    )
}

export default EndPageCottonUSA;