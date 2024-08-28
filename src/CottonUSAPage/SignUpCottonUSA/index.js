import React from "react";
import "./index.css";
import HeaderCottonUSA from "../HeaderCottonUSA";
import EndPageCottonUSA from "../endPage";
import ProductCottonUSAInHomePage from "../HomePageCottonUSA/ProductInHomePage"
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from "react";
import HomePageCottonUSA from "../HomePageCottonUSA";
import { useNavigate } from "react-router-dom";

const signUpUser = async (userData) => {
    try {
        const response = await fetch('https://suitable-pug-typically.ngrok-free.app/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        return response.json(); // Assuming the response returns some data on successful signup
    } catch (error) {
        throw new Error(error.message); // Handle error cases
    }
};


function SignUpCottonUSA() {
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage , setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setIsError(false);
        setError(null);
        setIsSuccess(false);

        const formData = new FormData(event.target);
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            passWord: formData.get('password'),
        };

        try {
            const result = await signUpUser(userData);
            setSuccessMessage('Đăng ký thành công! Chào mừng bạn đến với Cotton USA.');
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/'); 
            }, 1000); 
        } catch (error) {
            setIsError(true);
            setErrorMessage("Bạn đã nhập trùng email")
            setError(error.message);
        } finally {
            setIsLoading(true);
        }
    };

    return (
        <div>
            <div className="header">
                <HeaderCottonUSA></HeaderCottonUSA>
            </div>
            {isLoading&&<div className="loadingPageSignUp">Đang xử lý...</div>}
            {isError && <div className="errorMessage">Email đã được sử dụng</div>}
            {isSuccess && <div className="successMessage">Đăng ký thành công hãy mua sắm cùng CottonUSA</div>}
            <div className="allFormResisterCustomer">
                <form className="formResisterCustomer" onSubmit={handleSubmit}>
                    <div className="subjectResister">
                        <h1>Đăng Ký</h1>
                    </div>
                    <div className="inputFormResisterCottonUSA">
                        <input placeholder="Tên" name="firstName" required></input>
                    </div>
                    <div className="inputFormResisterCottonUSA">
                        <input placeholder="Họ" name="lastName" required></input>
                    </div>
                    <div className="inputFormResisterCottonUSA">
                        <input placeholder="E-mail" name="email" required></input>
                    </div>
                    <div className="inputFormResisterCottonUSA">
                        <input placeholder="Mật khẩu" name="password" type="password" required></input>
                    </div>
                    <div className="inputFormResisterCottonUSA">
                        <button type="submit">Tạo Tài Khoản</button>
                    </div>
                    <div className="ButtonInputFormResisterCottonUSA">
                        <Link to="/dangnhapCottonUSA"> <p>Đăng nhập</p></Link>
                    </div>
                </form>
            </div>
         
        </div>
    );
}

export default SignUpCottonUSA;