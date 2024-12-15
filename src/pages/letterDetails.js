import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header2 from "../components/header2.js";
import "../App.css"; // Add a CSS file for styling this page
import "../styles/letterDetails.css"; // Add a CSS file for styling this page

function LetterDetails() {
    const { letterNumber } = useParams(); // URL에서 letterNumber 파라미터 추출
    const [letter, setLetter] = useState(null); // 편지 데이터를 저장할 상태
    const [error, setError] = useState(null); // 오류 메시지 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

    // 로그인된 사용자 토큰 가져오기
    const token = localStorage.getItem("authToken");

    // 편지 상세 정보를 가져오는 useEffect
    useEffect(() => {
        if (!letterNumber) {
            setError("편지 번호가 없습니다.");
            return;
        }

        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        // API 호출하여 편지 상세 정보 가져오기
        const fetchLetterDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/backend/letters/archive/${letterNumber}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`편지 상세 정보를 불러오는 데 실패했습니다. 상태 코드: ${response.status}`);
                }

                const data = await response.json();
                setLetter(data); // 받은 편지 상세 데이터를 상태에 저장
            } catch (error) {
                setError("편지 상세 정보를 불러오는 데 오류가 발생했습니다.");
                console.error("편지 상세 오류:", error);
            }
        };

        fetchLetterDetails();
    }, [letterNumber, token]); // letterNumber와 token이 변경될 때마다 호출

    // 오류가 발생한 경우 메시지 표시
    if (error) {
        return <p>{error}</p>;
    }

    // 편지 데이터를 로딩 중인 경우
    if (!letter) {
        return <p>편지 정보를 불러오는 중...</p>;
    }

    return (
        <div className="main-container">
            <Header2 route={"/list"} /> {/* "편지 목록" 페이지로 돌아가는 버튼 */}
            <div className="letter-content">
                <div className="letter-details-card">
                    <h2>{letter.title}</h2>
                    <p className="letter-date">{letter.createdAt}</p>
                    <p className="letter-content">{letter.content}</p>
                    <p className="letter-sender">From: {letter.senderId}</p>
                </div>
            </div>
        </div>
    );
}

export default LetterDetails;
