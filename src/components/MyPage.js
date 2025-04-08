import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function MyPage() {
    const navigate = useNavigate();

    return (
        <div className="Login">
            <header className="Login-header">
                <button className="Login-home-button" type="button" onClick={() => navigate("/")}>We go high</button>
            </header>
        </div>
    );
}

export default MyPage;
