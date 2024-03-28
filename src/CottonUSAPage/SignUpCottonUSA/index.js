import React from "react";
import "./index.css";
import HeaderCottonUSA from "../HeaderCottonUSA";
import EndPageCottonUSA from "../endPage";
import ProductCottonUSAInHomePage from "../HomePageCottonUSA/ProductInHomePage"
import { Link } from "react-router-dom";
function SignUpCottonUSA() {

    return (
        <div>
            <div className="header">
                <HeaderCottonUSA></HeaderCottonUSA>
            </div>
            <div className="allFormResisterCustomer">
                <form className="formResisterCustomer">
                    <div className="subjectResister">
                        <h1>Đăng Ký</h1>
                    </div>
                    <div className="inputFormResisterCottonUSA">
                        <input placeholder="Tên"></input>
                    </div>
                    <div className="inputFormResisterCottonUSA">
                        <input placeholder="Họ"></input>
                    </div>
                    <div className="inputFormResisterCottonUSA">
                        <input placeholder="E-mail"></input>
                    </div>
                    <div className="inputFormResisterCottonUSA">
                        <input placeholder="Mật khẩu"></input>
                    </div>
                    <div className="inputFormResisterCottonUSA">
                        <button>Tạo Tài Khoản</button>
                    </div>
                    <div className="ButtonInputFormResisterCottonUSA">
                        <Link to="/dangnhapCottonUSA"> <p>Đăng nhập</p></Link>
                    </div>
                </form>
            </div>
            <div>
                <EndPageCottonUSA></EndPageCottonUSA>
            </div>
        </div>
    )
}

export default SignUpCottonUSA;