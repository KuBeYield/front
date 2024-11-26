import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Link, useHistory, useNavigate  } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import "../App.css";
import "../styles/login.css";

import Header2 from "../components/header2.js";

const SignupPage = () => {
  const [userId, setUserId] = useState("");
  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 아이디 중복 확인 함수
  const handleCheckUserId = async () => {
    if (!userId) {
      alert("아이디를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `https://lettertofuture-api.onrender.com/users/signup/idCheck`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // 요청의 데이터 형식을 JSON으로 지정
          },
          body: JSON.stringify({ userId }), // body에 userId 포함
        },
      );

      const data = await response.json();

      if (response.ok) {
        setIsUserIdAvailable(true);
        alert("사용 가능한 아이디입니다.");
      } else {
        setIsUserIdAvailable(false);
        alert(data.message || "이미 사용 중인 아이디입니다.");
      }
    } catch (err) {
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  // 회원가입 함수
  const handleSignup = async () => {
    try {
      if (!userId || !userEmail || !password) {
        alert("모든 필드를 입력해주세요.");
        return;
      }

      // 이메일 형식 확인
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        alert("올바른 이메일 형식을 입력해주세요.");
        return;
      }

      // 비밀번호 길이 확인
      if (password.length < 6) {
        alert("비밀번호는 6자 이상이어야 합니다.");
        return;
      }

      if (isUserIdAvailable === false) {
        alert("아이디 중복 확인을 해주세요.");
        return;
      }

      const response = await fetch("https://lettertofuture-api.onrender.com/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          userEmail,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("회원가입이 성공적으로 완료되었습니다!");
        setError("");
        setUserId("");
        setEmail("");
        setPassword("");
        setIsUserIdAvailable(null);
        navigate("/");
      } else {
        alert(data.message || "회원가입에 실패했습니다.");
      }
    } catch (err) {
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login-container">
      <Header2 />
      <div className="rectangle-box">
        <div className="login-form">
          <div className="login-title-box">
            <text className="login-title">회원가입 하기</text>
          </div>
          <div className="id-input-container">
            <input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setIsUserIdAvailable(null); // 상태 초기화
              }}
            />
            <button
              className="duplicate-check-button"
              onClick={handleCheckUserId}
            >
              중복 확인
            </button>
          </div>
          <br />
          <input
            type="email"
            placeholder="이메일"
            value={userEmail}
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
          <button className="login-button" onClick={handleSignup}>회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
