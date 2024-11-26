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
    const authToken = localStorage.getItem("authToken");
    
    if (authToken) {
      console.log("로그인 상태: 토큰 확인 완료");
      setLoggedIn(true); // 토큰이 존재하면 로그인 상태로 변경
    } else {
      console.log("로그인 상태: 토큰 없음");
      setLoggedIn(false); // 토큰이 없으면 비로그인 상태
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />
            
            <Route path="/write" element={<WriteLetter />} />
            <Route path="/read" element={<ReadLetter />} />
            <Route path="/list" element={<LetterList />} />
            <Route path="/letter/:id" element={<LetterDetails />} />
          </Routes>
        )}
      </div>
      
    </BrowserRouter>
      
  );
}

export default App;
