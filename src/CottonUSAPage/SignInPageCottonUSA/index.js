import React from "react";
import HeaderCottonUSA from "../HeaderCottonUSA";
import EndPageCottonUSA from "../endPage";
import "./index.css"
import { Link } from "react-router-dom";
function SignInCottonUSA() {
    return (
        <div>
            <div className="headerOnAboutUSPage">
                <HeaderCottonUSA></HeaderCottonUSA>
            </div>
            <div className="allFormSignInCottonUSA">
                <form className="formSignInCottonUSA">
                    <h1>Đăng Nhập</h1>
                    <input placeholder="E-mail"></input>
                    <input placeholder="Mật khẩu"></input>
                    <p>Quên mật khẩu?</p>
                    <button>Đăng nhập</button>
                    <Link to="/DANGKYCOTTONUSA"><p id="ResisterButton">Đăng ký</p></Link>
                </form>
            </div>
            <div>
                <EndPageCottonUSA></EndPageCottonUSA>
            </div>
        </div>
    )
}

export default SignInCottonUSA;
