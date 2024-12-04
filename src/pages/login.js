// pages/HomePage.js
import React, { useState } from "react";
import styled from 'styled-components';
import { BrowserRouter, Routes, Route, Link, useHistory, useNavigate  } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../App.css"
import "../styles/login.css"; // 스타일 파일을 연결합니다.

import ImageButton from '../components/ImageButton';  // ImageButton 컴포넌트 import
import rectangleImage from "../assets/rectangle.png"
import chevronImage from "../assets/chevron.png"

import Header2 from "../components/header2.js";


const Login = ({ setLoggedIn }) => {
    const [userId, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // 로그인 함수
  const handleLogin = async () => {
    try {
      // 간단한 유효성 검사
      if (!userId || !password) {
        setError("※아이디와 비밀번호를 입력하세요.");
        return;
      }

      // 백엔드 API 요청 (예제용 URL)

      const response = await fetch("https://lettertofuture-api.onrender.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", // JSON 응답을 기대
        },
        body: JSON.stringify({
          userId,
          password,
        }),
      });
      

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.accessToken); // 토큰 저장
        // alert("로그인 성공!");
        setError(""); // 오류 메시지 초기화
        navigate("/"); // 홈으로 이동
      } else {
        // 로그인 실패 처리
        setError(data.message || "※로그인 실패. 다시 시도하세요.");
      }
    } catch (err) {
        setError("※서버와 통신 중 오류가 발생했습니다.");
    }
  };

  // Enter 키 처리 함수
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

    return (
        <div className="login-container">
            <Header2 route={"/"}/>
            {/* 사각형 박스 */}
            <div className="rectangle-box">
                
                {/* 로그인 폼 */}
                <div className="login-form">
                    <div className="login-title-box">
                      <text className="login-title">
                          로그인 하기
                      </text>
                    </div>



                    <input className="login-input" type="text" placeholder="ID 입력하기" 
                        value={userId}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <input className="login-input" type="password" placeholder="비밀번호 입력하기"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown} // Enter 키 이벤트 연결
                    />
                    {/* 로그인 실패 메시지 표시 */}
                    {error && <div className="login-result">{error}</div>}
                    
                    <button className="login-button" onClick={handleLogin}>로그인</button>
                   
                </div>
            </div>
                    
        </div>
    
    );
}



export default Login;
