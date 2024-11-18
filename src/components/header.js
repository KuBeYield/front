import React from "react";
import lineImage from "../assets/line.png"
import letterImage from "../assets/letter.png"

function Header(){
    return(
        <header className="header">
            <div className="titles">
                <h1 className="title">Letter</h1>
                <h1 className="title">To</h1>
                <h1 className="title">Future</h1>
            </div>
            <div className="line-div">
                <img 
                className="line"
                src={lineImage}
                alt="선"
            />
            </div>
            <p className="title-kr">미래에게 쓰는 편지</p>
            <img
                src={letterImage}
                alt="편지 이미지"
                className="header-image"
            />
        </header>
    )
}

export default Header;