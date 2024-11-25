// pages/HomePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header.js";
import { BrowserRouter, Routes, Route, Link, useHistory  } from "react-router-dom";
import "../App.css"; // 스타일 파일을 연결합니다.
import alarmImage from "../assets/alarm.png"



  
function HomePage() {
    const [alarm, setAlarm] = useState(true);
    const navigate = useNavigate();

    function handleLogout() {
        // 1. 로그인 상태 초기화
        // setLoggedIn(false); 
      
        // 2. 로컬 스토리지에서 토큰 제거
        localStorage.removeItem("authToken"); 
      
        // 3. 홈 또는 로그인 페이지로 이동
        navigate("/"); 
      }

    // 서버에서 응답 받기
    // useEffect(() => {
    //     // 예시 API 호출 (응답에 따라 `alarm` 상태 업데이트)
    //     fetch("https://example.com/api/check-alarm")
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setAlarm(data.alarm); // 서버 응답에서 `alarm` 값을 설정
    //     })
    //     .catch((error) => console.error("Error fetching alarm data:", error));
    // }, []);

    return (
        <div className="main-container">
            <Header />
            <div className="content">
                <Link to="/write">
                    <button className="button">
                        편지 작성하기
                    </button>
                </Link>
                <Link to="/list">
                    <div style={styles.notificationContainer}>
                        <button className="button" style={styles.button}>
                            받은 편지 확인하기
                        </button>
                        {alarm && <img src={alarmImage} alt="알람" style={styles.alarmIcon} />}
                    </div>
                    
                </Link>
                <button className="button" onClick={handleLogout}>
                    로그아웃하기
                </button>
            </div>
                
        </div>
    )
}

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #f5e1ff, #e3efff)",
      textAlign: "center",
    },
    title: { fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" },
    subtitle: { fontSize: "1rem", color: "#777", marginBottom: "2rem" },
    buttonContainer: { display: "flex", flexDirection: "column", gap: "1rem" },
    button: {
      backgroundColor: "white",
      border: "none",
      borderRadius: "25px",
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      position: "relative",
    },
    notificationContainer: { position: "relative", width: "350px" },
    alarmIcon: {
      position: "absolute",
      top: "-10px",
      right: "40px",
      width: "20px",
      height: "20px",
    },
  };

export default HomePage;
