// pages/HomePage.js
import React, { useState } from "react";
import Header from "../components/header.js";
import { BrowserRouter, Routes, Route, Link, useHistory  } from "react-router-dom";
import "../App.css"; // 스타일 파일을 연결합니다.
import "../styles/writeLetter.css"; // 스타일 추가
import Header2 from "../components/header2.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const WriteLetter= () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [date, setDate] = useState(null);
    const [isDateModalOpen, setIsDateModalOpen] = useState(false); // 날짜 선택창 상태
    const [isResultModalOpen, setIsResultModalOpen] = useState(false); // 날짜 선택창 상태


    const idList = ["test1", "test2", "test3", "were1117"];

    const handleDateComplete = () => {
        if (!year || !month || !day) {
          alert("날짜를 모두 입력해주세요.");
          return;
        }
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
        alert(`날짜가 설정되었습니다: ${formattedDate}`);
        setIsDateModalOpen(false)
    };
  
    const handleSend = async () => {
        if (!title || !selectedId || !content || !date) {
          alert("모든 필드를 입력해주세요.");
          return;
        }
      
        try {
          const token = localStorage.getItem("authToken"); // 로컬 스토리지에서 인증 토큰 가져오기
          if (!token) {
            alert("로그인이 필요합니다.");
            return;
          }
      
          // API 요청 데이터 준비
          const requestBody = {
            recipientId: selectedId,
            title,
            content,
            sendAt: date, // yyyy-mm-dd 형식으로 전달
          };
    
          const response = await fetch("https://lettertofuture-api.onrender.com/letters/write", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`, // 인증 토큰 추가
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            alert("편지가 성공적으로 전송되었습니다.");
            setIsResultModalOpen(true); // 결과 모달 열기
      
            // 입력 필드 초기화
            setTitle("");
            setSelectedId("");
            setContent("");
            setDate("");
          } else {
            alert(`편지 전송 실패: ${data.message || "알 수 없는 오류"}`);
          }
        } catch (error) {
          console.error("편지 전송 중 오류 발생:", error);
          alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
        }
      };
      
    

    return (
        
        <div className="main-container">
            <Header2 route={"/"}/>
            {/* 사각형 박스 */}
            <div className="rectangle-box">
                <div className="letter-container">
                    <input
                        className="input-field"
                        type="text"
                        placeholder="제목을 작성해 주세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {/* ID 선택 (드롭다운) */}
                    <div className="dropdown-container">
                        <button
                            className="dropdown-toggle"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {selectedId || "ID를 선택해주세요"}
                        </button>
                        {isDropdownOpen && (
                        <ul className="dropdown-menu">
                            {idList.map((id) => (
                            <li
                                key={id}
                                className="dropdown-item"
                                onClick={() => {
                                    setSelectedId(id);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                {id}
                            </li>
                            ))}
                        </ul>
                        )}
                    </div>
                    <textarea
                        className="textarea-field"
                        placeholder="내년 오늘에 어떤 이야기를 남기고 싶나요? 미래에게 편지를 작성해 주세요"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    {/* 날짜 선택 모달 */}
                    {isDateModalOpen && (
                        <div className="modal">
                        <div className="modal-content">
                            <p className="date-input-title">날짜 입력</p>
                            <div className="date-input-fields">
                            <input
                                type="number"
                                placeholder="____년"
                                className="date-input"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="__월"
                                className="date-input"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="__일"
                                className="date-input"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                            />
                            </div>
                            <button className="date-complete-button" onClick={handleDateComplete}>
                            날짜 설정 완료하기
                            </button>
                            {/* <button
                            className="modal-close-button"
                            onClick={() => setIsDateModalOpen(false)}
                            >
                            닫기
                            </button> */}
                        </div>
                        </div>
                    )}

                    {/* 완료 모달 */}
                    {isResultModalOpen && (
                        <div className="modal">
                        <div className="modal-content">
                            <p className="date-input-title">편지 작성 완료</p>
                            
                            <button className="date-complete-button">
                            <Link to="/">홈 화면으로 돌아가기</Link>
                            
                            </button>
                        </div>
                        </div>
                    )}
                    <div className="button-group">
                        <button
                            className="secondary-button"
                            onClick={() => setIsDateModalOpen(true)}
                            >
                            편지 확인 날짜 입력
                            </button>
                        <button className="primary-button" onClick={handleSend}>
                        전송하기
                        </button>
                    </div>
                </div>

            </div>
            

                
        </div>
    )
}

export default WriteLetter;
