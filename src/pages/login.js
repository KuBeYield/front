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
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // 로그인 함수
  const handleLogin = async () => {
    try {
      // 간단한 유효성 검사
      if (!id || !password) {
        setError("※아이디와 비밀번호를 입력하세요.");
        return;
      }

      // 백엔드 API 요청 (예제용 URL)
      const response = await fetch("https://example.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공 처리
        setLoggedIn(true); // App 컴포넌트의 로그인 상태 업데이트
        localStorage.setItem("authToken", data.token); // 토큰 저장
        
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

    return (
        <div className="login-container">
            <Header2 />
            {/* 사각형 박스 */}
            <div className="rectangle-box">
                
                {/* 로그인 폼 */}
                <div className="login-form">
                    <div className="login-title-box">
                      <text className="login-title">
                          로그인 하기
                      </text>
                    </div>

                    <div className="login-form">

                    </div>
                    <input className="login-input" type="text" placeholder="ID 입력하기" 
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <input className="login-input" type="password" placeholder="비밀번호 입력하기"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* 로그인 실패 메시지 표시 */}
                    {error && <div className="login-result">{error}</div>}
                    
                    <button onClick={handleLogin}>로그인</button>
                   
                </div>
            </div>
                    
        </div>
    
    );
}



export default Login;
