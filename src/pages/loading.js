import React, { useEffect, useState }  from "react";
import "../App.css"; // 스타일 파일을 연결합니다.
import "../styles/loading.css"
import Header from "../components/header.js";
import loadingImage from "../assets/loading-img.png"
import spinnerImage from "../assets/spinner.gif"

function Loading(){
    const [isFading, setIsFading] = useState(false);

    // 2초 후 애니메이션 시작
    useEffect(() => {
        const timer = setTimeout(() => {
        setIsFading(true);
        }, 1000); // 로딩 시작 후 1초 뒤에 애니메이션 시작

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    }, []);

    
    return (
        <div className="main-container">
            <Header />
            <div className={`loading-fade ${isFading ? "fade-out" : ""}`}>
                <img
                    src={loadingImage}
                    alt="편지"
                />
            </div>
        </div>
    )
}

export default Loading;