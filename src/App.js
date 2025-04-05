import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import Login from './Login';
import AccountFind from "./AccountFind";
import SignUp from "./SignUp";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="Home">
            <header className="Home-header">
                <div className="Home-title">
                    <button className="Home-home-button" type="button" onClick={() => navigate("/")}>We go high</button>
                    <button className="Home-login-button" type="button" onClick={() => navigate("/login")}>
                        로그인
                    </button>
                </div>
                <p className="Home-body">정보를 원하는 기사의 URL을<br />입력해 보세요.</p>
                <div className="Home-Search">
                    <input id="Home-search-input" placeholder="뉴스 URL을 입력하세요." />
                    <img className="Home-search-img" src="/icon.png" alt="돋보기" />
                </div>
                <p className="Home-tail">로그인해서 전에 검색했던 내용을<br />다시 확인하세요!</p>
            </header>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/accountFind" element={<AccountFind />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;
