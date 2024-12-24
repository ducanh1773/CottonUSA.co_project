import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderCottonUSA from "../HeaderCottonUSA";
import EndPageCottonUSA from "../endPage";
import { Link } from "react-router-dom";
import "./index.css";

const signInUser = async (userData) => {
    try {
        const response = await fetch('http://localhost:80/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        if (data.token) {
            localStorage.setItem('token', data.token);
        }

        return data.message;
    } catch (error) {
        throw new Error(error.message);
    }
};

function SignInCottonUSA() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsError(false);
        setIsSuccess(false);
        setIsLoading(true);

        const formData = new FormData(event.target);
        const userData = {
            email: formData.get('email'),
            passWord: formData.get('passWord'),
        };

        console.log(userData.email);
        console.log(userData.passWord);

        try {
            const response = await signInUser(userData);
            if (response === "Đăng nhập thành công!") {
                setIsSuccess(true);
                setIsLoading(false);
                setTimeout(() => {
                    navigate('/'); // Redirect to home page
                }, 1000);
            } else {
                setIsError(true);
                setIsLoading(false);
            }
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="headerOnAboutUSPage">
                <HeaderCottonUSA />
            </div>
            {isLoading && <div className="loadingPageSignUp">Đang xử lý...</div>}
            {isError && <div className="errorMessage ">Bạn đã nhập sai tên đăng nhập hoặc mật khẩu</div>}
            {isSuccess && <div className="successMessage loadingPageSignUp">Đăng nhập thành công! Chào mừng bạn đến với Cotton USA</div>}
            <div className="allFormSignInCottonUSA">
                <form className="formSignInCottonUSA" onSubmit={handleSubmit}>
                    <h1>Đăng Nhập</h1>
                    <input placeholder="E-mail" name="email" type="email" required />
                    <input placeholder="Mật khẩu" name="passWord" type="password" />
                    <p>Quên mật khẩu?</p>
                    <button type="submit" disabled={isLoading}>Đăng nhập</button>
                    <Link to="/DANGKYCOTTONUSA"><p id="ResisterButton">Đăng ký</p></Link>
                </form>
            </div>
            <div>
                <EndPageCottonUSA/>
            </div>
        </div>
    );
}

export default SignInCottonUSA;
