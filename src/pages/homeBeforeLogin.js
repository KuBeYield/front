// pages/HomePage.js
import React from "react";
import Header from "../components/header.js";
import { BrowserRouter, Routes, Route, Link, useHistory  } from "react-router-dom";
import "../App.css"; // 스타일 파일을 연결합니다.
import Loading from "./loading.js";

function HomeBeforeLogin() {
    
    return (
        <div className="main-container">
            <Header />
            <div className="content">
                <Link to="/login">
                    <button className="button">
                        로그인
                    </button>
                </Link>
                <Link to="/signup">
                    <button className="button">
                        회원가입 하기
                    </button>
                </Link>
            </div>
                
        </div>
    )
}

export default HomeBeforeLogin;
