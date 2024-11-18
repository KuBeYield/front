import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useHistory  } from "react-router-dom";
import "./App.css"; // 스타일 파일을 연결합니다.
import Loading from "./pages/loading.js";
import Header from "./components/header.js";
import Login from "./pages/login.js";
import HomePage from "./pages/home.js";
import WriteLetter from "./pages/writeLetter.js";
import ReadLetter from "./pages/readLetter.js";
import LetterList from "./pages/letterList.js";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
            <Route path="/" element={<HomePage />} />
            {/* <LogIn /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/write" element={<WriteLetter />} />
            <Route path="/read" element={<ReadLetter />} />
            <Route path="/list" element={<LetterList />} />
          </Routes>
        )}
      </div>
      
    </BrowserRouter>
      
  );
}

export default App;
