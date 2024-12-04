import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header2 from "../components/header2.js";
import opened_mail from "../assets/opened_mail.png"; // 읽은 편지 아이콘
import unopend_mail from "../assets/unopened_mail.png"; // 읽지 않은 편지 아이콘
import "../styles/letterList.css"; // 스타일 추가
import "../App.css";

function LetterList() {
  const [letters, setLetters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 로그인된 사용자 토큰 가져오기
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 서버에서 편지 목록을 불러오는 API 호출
    const fetchLetters = async () => {
      try {
        const response = await fetch("https://lettertofuture-api.onrender.com/letters/archive", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`편지 목록을 불러오는 데 실패했습니다. 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        setLetters(data.letters); // 서버 응답에서 letters 데이터 설정
      } catch (error) {
        setError("편지 목록을 불러오는 데 오류가 발생했습니다.");
        console.error("편지 목록 오류:", error);
      }
    };

    fetchLetters();
  }, []);

  return (
    <div className="main-container">
      <Header2 route={"/"}/>
      {/* 사각형 박스 */}
      <div className="rectangle-box">
        {error && <div className="error-message">{error}</div>} {/* 오류 메시지 표시 */}

        <div className="letters-container">
          {letters.map((letter) => (
            <Link key={letter.letterNumber} to={`/letter/${letter.letterNumber}`}>
              <div className="letter-card">
                <div className="letter-info">
                  <p>{letter.createdAt}에 작성한 편지</p>
                  <p>From: {letter.senderId}</p>
                </div>
                <div className="icon-container">
                  <img
                    src={letter.isChecked ? opened_mail : unopend_mail}
                    alt="Mail Icon"
                    className="mail-icon"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LetterList;
