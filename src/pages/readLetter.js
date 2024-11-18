// pages/HomePage.js
import React from "react";
import Header from "../components/header.js";
import { BrowserRouter, Routes, Route, Link, useHistory  } from "react-router-dom";
import "../App.css"; // 스타일 파일을 연결합니다.

function ReadLetter() {
    return (
        <div className="main-container">
            <Header />
            <div className="content">
                편지 읽기
            </div>
                
        </div>
    )
}

export default ReadLetter;
