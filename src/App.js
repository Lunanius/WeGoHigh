import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import Login from './Login';
import AccountFind from "./AccountFind";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <header className="App-header">
                <div className="container">
                    <h1>We go high</h1>
                    <button className="login-button" type="button" onClick={() => navigate("/login")}>
                        로그인
                    </button>
                </div>
                <p className="App-body">정보를 원하는 기사의 URL을<br />입력해 보세요.</p>
                <div className="Search">
                    <input id="search-input" placeholder="뉴스 URL을 입력하세요." />
                    <img className="Search-img" src="/icon.png" alt="돋보기" />
                </div>
                <p className="App-tail">로그인해서 전에 검색했던 내용을<br />다시 확인하세요!</p>
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
            </Routes>
        </Router>
    );
}

export default App;
