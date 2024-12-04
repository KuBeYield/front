import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useHistory, Navigate  } from "react-router-dom";
import "./App.css"; // 스타일 파일을 연결합니다.
import Loading from "./pages/loading.js";
import Header from "./components/header.js";
import Login from "./pages/login.js";
import SignupPage from "./pages/signUp.js";
import HomePage from "./pages/home.js";
import LetterDetails from "./pages/letterDetails";
import HomeBeforeLogin from "./pages/homeBeforeLogin.js";
import WriteLetter from "./pages/writeLetter.js";
import ReadLetter from "./pages/readLetter.js";
import LetterList from "./pages/letterList.js";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false); // 로그인 상태 관리

  useEffect(() => {
    const checkAuthToken = () => {
      const authToken = localStorage.getItem("authToken");
      setLoggedIn(!!authToken); // 토큰 존재 여부로 로그인 상태 업데이트
    };

    checkAuthToken();

    // if (authToken) {
    //   console.log("로그인 상태: 토큰 확인 완료");
    //   setLoggedIn(true); // 토큰이 존재하면 로그인 상태로 변경
    // } else {
    //   console.log("로그인 상태: 토큰 없음");
    //   setLoggedIn(false); // 토큰이 없으면 비로그인 상태
    // }

    const interval = setInterval(checkAuthToken, 1000); // 주기적으로 상태 확인 (옵션)

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer, interval);
  }, []);

  return (
    <BrowserRouter>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <Routes>
            {/* 웹 서비스 소개 페이지 */}
            <Route
              path="/"
              element={loggedIn ? <HomePage /> : <HomeBeforeLogin />}
            />
            {/* <Route
              path="/"
              element={loggedIn ? <HomePage /> : <HomeBeforeLogin />}
            /> */}
            {/* <LogIn /> */}
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path="/signup" element={<SignupPage />} />
            
            <Route path="/write" element={<WriteLetter />} />
            <Route path="/read" element={<ReadLetter />} />
            <Route path="/list" element={<LetterList />} />
            <Route path="/letter/:letterNumber" element={<LetterDetails />} />
          </Routes>
        )}
      </div>
      
    </BrowserRouter>
      
  );
}

export default App;
