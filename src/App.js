import logo from './logo.svg';
import './App.css';
import HeaderCottonUSA from './CottonUSAPage/HeaderCottonUSA';
import { useState, useEffect } from 'react';
import HomePageCottonUSA from './CottonUSAPage/HomePageCottonUSA';
import SignInCottonUSA from './CottonUSAPage/SignInPageCottonUSA';
import SignUpCottonUSA from './CottonUSAPage/SignUpCottonUSA';
import ProductPage from './CottonUSAPage/ProductPage';
import { Routes, Route, Outlet, Link, Router, BrowserRouter } from "react-router-dom";
import AboutUsCottonUSA from './CottonUSAPage/InformationCottonUSAPage';
import ReturnPolicy from './CottonUSAPage/ChinhSachDoiTra';
import PolicyAndService from './CottonUSAPage/PolIcyAndService';
import SecurityPrivate from './CottonUSAPage/SecurityPrivate';
import ContactPageUSA from './CottonUSAPage/ContactPageCottonUSA';
import ProductDetailCottonUSA from './CottonUSAProductDetail';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import {getTodos ,postTodo} from "../src/CottonUSAPage/SignInPageCottonUSA";
const queryClient = new QueryClient()
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePageCottonUSA></HomePageCottonUSA>}></Route>
        <Route path='*/' element={<HomePageCottonUSA></HomePageCottonUSA>}></Route>
        <Route path='/dangnhapCottonUSA' element={<SignInCottonUSA></SignInCottonUSA>}></Route>
        <Route path='/DANGKYCOTTONUSA' element={<SignUpCottonUSA></SignUpCottonUSA>}></Route>
        <Route path='/collection/t-shirt' element={<ProductPage></ProductPage>}></Route>
        <Route path='/AboutUs' element={<AboutUsCottonUSA></AboutUsCottonUSA>}></Route>
        <Route path='/Chinh-sach-doi-tra-va-bao-hanh' element={<ReturnPolicy></ReturnPolicy>}></Route>
        <Route path='/Điều-khoản-và-dịch-vụ' element={<PolicyAndService></PolicyAndService>}></Route>
        <Route path='/chinh-sach-bảo-mật' element={<SecurityPrivate></SecurityPrivate>}></Route>
        <Route path='/contact' element={<ContactPageUSA></ContactPageUSA>}></Route>
        <Route path='/products/:id'element={<ProductDetailCottonUSA></ProductDetailCottonUSA>}></Route>
        
      
      </Routes>
    </div>
  )
}

export default App;
