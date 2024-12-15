// pages/HomePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header.js";
import { BrowserRouter, Routes, Route, Link, useHistory  } from "react-router-dom";
import "../App.css"; // 스타일 파일을 연결합니다.
import alarmImage from "../assets/alarm.png"



  
function HomePage() {
    const [alarm, setAlarm] = useState(true);
    const [unread, setUnread] = useState(0);  // 안 읽은 편지 개수 관리
    const navigate = useNavigate();

    async function handleLogout() {
        const token = localStorage.getItem("authToken");

        if (!token || token === "undefined" || token === "null") {
            alert("로그인된 토큰이 없습니다.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/backend/users/logout", {
            method: "POST", // 로그아웃 메서드는 API 설계에 따라 달라질 수 있습니다.
            headers: {
                "Authorization": `Bearer ${token}`, // Bearer 토큰으로 인증
                "Content-Type": "application/json",
            },
            });

            if (response.ok) {
                localStorage.removeItem("authToken"); // 클라이언트에서 토큰 삭제
                alert("로그아웃 성공");
                navigate("/");
            } else {
                const errorData = await response.json();
                
                alert("로그아웃 실패:", errorData.message || "Unknown error");

            }
        } catch (error) {
            alert("네트워크 오류:", error.message);
        }
    }

    // 서버에서 응답 받기
    useEffect(() => {
        const fetchAlarmData = async () => {
          try {
            const token = localStorage.getItem("authToken"); // 로컬 스토리지에서 토큰 가져오기
      
            const response = await fetch("http://localhost:8080/backend/main", {
              method: "GET", // 요청 메서드
              headers: {
                "Authorization": `Bearer ${token}`, // Bearer 토큰으로 인증
                "Content-Type": "application/json",
              },
            });
      
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            const data = await response.json();
            setAlarm(data.alarm);    // 서버 응답에서 alarm 값을 설정
            setUnread(data.unread); // 서버 응답에서 unread 값 설정
            console.log("알람 데이터가 업데이트되었습니다:", data);
          } catch (error) {
            console.error("알람 데이터를 불러오는 중 오류 발생:", error);
          }
        };
      
        fetchAlarmData(); // 비동기 함수 호출
      }, []);
      

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
