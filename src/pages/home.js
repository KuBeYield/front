// pages/HomePage.js
import React from "react";
import Header from "../components/header.js";
import { BrowserRouter, Routes, Route, Link, useHistory  } from "react-router-dom";
import "../App.css"; // 스타일 파일을 연결합니다.

function HomePage() {
    return (
        <div className="main-container">
            <Header />
            <div className="content">
                <button className="button">
                    <Link to="/login">로그인 및 회원가입 하기</Link>
                </button>

                <button className="button">
                    <Link to="/write">편지 작성하기</Link>
                </button>

                <button className="button">
                    <Link to="/list">작성한 편지 확인하기</Link>
                </button>
            </div>
                
        </div>
    )
}

export default HomePage;
