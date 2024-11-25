import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../components/header2.js";
import "../App.css"; // Add a CSS file for styling this page
import "../styles/letterDetails.css"; // Add a CSS file for styling this page

const letters = [
    { id: 1, date: "24/06/21", sender: "익명", title: "첫 번째 편지", content: "안녕하세요? 오늘도 기분 좋은 하루 보내세요!" },
    { id: 2, date: "24/12/01", sender: "익명", title: "두 번째 편지", content: "미래의 나에게, 잘 지내고 있지?" },
    { id: 3, date: "24/12/19", sender: "익명", title: "세 번째 편지", content: "앞으로도 열심히 노력하세요!" },
    { id: 4, date: "24/11/10", sender: "익명", title: "네 번째 편지", content: "지금 이 순간을 즐기세요!" },
];

function LetterDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const letter = letters.find((letter) => letter.id === parseInt(id));

    if (!letter) {
        return <p>편지를 찾을 수 없습니다.</p>;
    }

    return (
        <div className="main-container">
            <Header2 />
            <div className="letter-content">
                <div className="letter-details-card">
                    <h2>{letter.title}</h2>
                    <p className="letter-date">{letter.date}</p>
                    <p className="letter-content">{letter.content}</p>
                    <p className="letter-sender">From: {letter.sender}</p>
                </div>
            </div>
            
        </div>
    );
}

export default LetterDetails;
