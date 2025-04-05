import React from "react";
import { useLocation } from 'react-router-dom';

const MyInput = () => {
    const [text, setText] = useState(""); // 상태(state) 선언

    const handleChange = (e) => {
        setText(e.target.value); // 입력값을 상태에 저장
    };
    return (
        <div>
            <input type="text" value={text} onChange={handleChange} />
            <p>입력값: {text}</p>
        </div>
    );
};

function ProductPage() {
    const location = useLocation();

    console.log(location.pathname); // "/products"
    console.log(location.search);   // "?category=shoes&color=red"
    console.log(location.hash);     // "#reviews"
}