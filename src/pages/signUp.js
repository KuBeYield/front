import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../App.css"
import "../styles/login.css"; // 스타일 파일을 연결합니다.

import ImageButton from '../components/ImageButton';  // ImageButton 컴포넌트 import
import rectangleImage from "../assets/rectangle.png"
import chevronImage from "../assets/chevron.png"

import Header2 from "../components/header2.js";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      // 간단한 유효성 검사
      if (!username || !email || !password) {
        toast.error("모든 필드를 입력해주세요.");
        return;
      }

      // 이메일 형식 확인
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("올바른 이메일 형식을 입력해주세요.");
        return;
      }

      // 비밀번호 길이 확인
      if (password.length < 6) {
        toast.error("비밀번호는 최소 6자 이상이어야 합니다.");
        return;
      }

      // API 요청
      const response = await fetch("https://example.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("회원가입이 성공적으로 완료되었습니다!");
        setUsername(""); // 입력 필드 초기화
        setEmail("");
        setPassword("");
      } else {
        toast.error(data.message || "회원가입에 실패했습니다.");
      }
    } catch (err) {
      toast.error("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login-container">
        <Header2 />
      <h1>회원가입 페이지</h1>
      <div className="rectangle-box">
        {/* 로그인 폼 */}
        <div className="login-form">
        <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleSignup}>회원가입</button>

        {/* ToastContainer 추가 */}
        <ToastContainer 
            position="top-right" 
            autoClose={3000} 
            hideProgressBar={false} 
            newestOnTop={false} 
            closeOnClick 
            rtl={false} 
            pauseOnFocusLoss 
            draggable 
            pauseOnHover 
            theme="colored" 
        />
        </div>
      </div>
      
    </div>
  );
};

export default SignupPage;
