import React from "react";
import lineImage from "../assets/line.png"
import letterImage from "../assets/letter.png"
import "../styles/login.css"; // 스타일 파일을 연결합니다.
import ImageButton from '../components/ImageButton';  // ImageButton 컴포넌트 import
import rectangleImage from "../assets/rectangle.png"
import chevronImage from "../assets/chevron.png"

function Header2({ route }){
    return(
        <div >
                <div className="back-button">
                    <ImageButton 
                        imageUrl={chevronImage}
                        linkTo={route}
                        altText="Go to Main Page" 
                    />
                    <text className="title2">Letter To Future</text>
                </div>
        </div>
    )
}

export default Header2;