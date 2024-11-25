import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Link, useHistory, useNavigate  } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import "../App.css";
import "../styles/login.css";

import Header2 from "../components/header2.js";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 아이디 중복 확인 함수
  const handleCheckUsername = async () => {
    if (!username) {
      toast.error("아이디를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `https://example.com/api/check-username?username=${username}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsUsernameAvailable(true);
        toast.success("사용 가능한 아이디입니다.");
      } else {
        setIsUsernameAvailable(false);
        toast.error(data.message || "이미 사용 중인 아이디입니다.");
      }
    } catch (err) {
      toast.error("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  // 회원가입 함수
  const handleSignup = async () => {
    try {
      if (!username || !email || !password) {
        setError("모든 필드를 입력해주세요.");
        return;
      }

      // 이메일 형식 확인
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("올바른 이메일 형식을 입력해주세요.");
        return;
      }

      // 비밀번호 길이 확인
      if (password.length < 6) {
        setError("비밀번호는 6자 이상이어야 합니다.");
        return;
      }

      if (isUsernameAvailable === false) {
        setError("아이디 중복 확인을 해주세요.");
        return;
      }

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
        setError("");
        setUsername("");
        setEmail("");
        setPassword("");
        setIsUsernameAvailable(null);
        navigate("/");
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
      <div className="rectangle-box">
        <div className="login-form">
          <div className="login-title-box">
            <text className="login-title">회원가입 하기</text>
          </div>
          <div className="id-input-container">
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setIsUsernameAvailable(null); // 상태 초기화
              }}
            />
            <button
              className="duplicate-check-button"
              onClick={handleCheckUsername}
            >
              중복 확인
            </button>
          </div>
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
          <button className="login-button" onClick={handleSignup}>회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
