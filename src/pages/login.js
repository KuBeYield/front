// pages/HomePage.js
import React, { useState } from "react";
import styled from 'styled-components';
import { BrowserRouter, Routes, Route, Link, useHistory, useNavigate  } from "react-router-dom";

import "../App.css"
import "../styles/login.css"; // 스타일 파일을 연결합니다.

import ImageButton from '../components/ImageButton';  // ImageButton 컴포넌트 import
import rectangleImage from "../assets/rectangle.png"
import chevronImage from "../assets/chevron.png"


const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
      // 로그인 처리 로직 (예: id, password 검사)
      // 성공 시 다른 페이지로 이동
      navigate('/home'); // 로그인 성공 후 이동할 페이지
    };

    const handleRegisterRedirect = () => {
      // 회원가입 페이지로 리디렉션
        navigate('/register');
    };

    return (
        <div className="login-container">
            <div >
                <div className="back-button">
                    <ImageButton 
                        imageUrl={chevronImage}
                        linkTo="/" 
                        altText="Go to Main Page" 
                    />
                    <text className="title2">Letter To Future</text>
                </div>
            </div>
            {/* 사각형 박스 */}
            <div className="rectangle-box">
                
                {/* 로그인 폼 */}
                <div className="login-form">
                    <text>
                        로그인, 회원가입 하기
                    </text>
                    <input type="text" placeholder="ID 입력하기" />
                    <input type="password" placeholder="비밀번호 입력하기" />
                    <button>로그인</button>
                    <button>회원가입</button>
                </div>
            </div>
                    
        </div>
    
    );
}



export default Login;
