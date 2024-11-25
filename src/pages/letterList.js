// pages/HomePage.js
import React from "react";
import Header from "../components/header.js";
import { BrowserRouter, Routes, Route, Link, useHistory  } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../App.css"
import "../styles/login.css"; // 스타일 파일을 연결합니다.

import ImageButton from '../components/ImageButton';  // ImageButton 컴포넌트 import
import rectangleImage from "../assets/rectangle.png"
import chevronImage from "../assets/chevron.png"

import Header2 from "../components/header2.js";
function LetterList() {
    return (
        <div className="main-container">
            <Header2 />
            {/* 사각형 박스 */}
            <div className="rectangle-box">
                
            </div>
                
        </div>
    )
}

export default LetterList;
