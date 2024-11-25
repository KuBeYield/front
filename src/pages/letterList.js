// pages/HomePage.js
import React from "react";
import Header from "../components/header.js";
import { BrowserRouter, Routes, Route, Link, useHistory  } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/letterList.css"; // 스타일 추가
import "../App.css"
import "../styles/login.css"; // 스타일 파일을 연결합니다.

import ImageButton from '../components/ImageButton';  // ImageButton 컴포넌트 import
import rectangleImage from "../assets/rectangle.png"
import chevronImage from "../assets/chevron.png"
import opened_mail from "../assets/opened_mail.png"; // Replace with the actual mail icon path
import unopend_mail from "../assets/unopened_mail.png"; // Replace with the actual mail icon path

import Header2 from "../components/header2.js";
function LetterList() {
    
    const letters = [
        { id: 1, date: "24/06/21", sender: "익명", title: "첫 번째 편지", content: "안녕하세요? 오늘도 기분 좋은 하루 보내세요!" },
        { id: 2, date: "24/12/01", sender: "익명", title: "두 번째 편지", content: "미래의 나에게, 잘 지내고 있지?" },
        { id: 3, date: "24/12/19", sender: "익명", title: "세 번째 편지", content: "앞으로도 열심히 노력하세요!" },
        { id: 4, date: "24/11/10", sender: "익명", title: "네 번째 편지", content: "지금 이 순간을 즐기세요!" },
    ];
    
    return (
        <div className="main-container">
            <Header2 />
            {/* 사각형 박스 */}
            <div className="rectangle-box">
                <div className="letters-container">
                    {letters.map((letter) => (
                        <Link
                            key={letter.id}
                            to={`/letter/${letter.id}`}
                        >
                            <div key={letter.id} className="letter-card">
                                <div className="letter-info">
                                    <p>{letter.date}에 작성한 편지</p>
                                    <p>From: {letter.sender}</p>
                                </div>
                                <div className="icon-container">
                                    <img src={opened_mail} alt="Mail Icon" className="mail-icon" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
                
        </div>
    )
}

export default LetterList;
