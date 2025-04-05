import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log("ID:", id);
        console.log("Password:", password);
        alert(`로그인 시도: ${id}`);
    };

    return (
        <div className="Login">
            <header className="Login-header">
                <h1>We go high</h1>
                <div className="Container">
                    <div className="Container-e">
                        <div className="Container-id">
                            <p className="Id-box">ID</p>
                            <input
                                className="Id-textbox" type="text" value={id}
                                onChange={(e) => setId(e.target.value)}
                                placeholder="아이디 입력"/>
                        </div>

                        <div className="Container-pw">
                            <p className="Pw-box">PW</p>
                            <input className="Pw-textbox" type="password" value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호 입력"/>
                        </div>

                        <div className="Container-login">
                            <button className="Login-button" onClick={handleLogin}>
                                로그인
                            </button>
                        </div>

                        <div className="Container-menu">
                            <button className="Menu-button" type="button" onClick={() => navigate("/accountFind")}>
                                ID/PW 찾기
                            </button>
                            <button className="Menu-button" type="button" onClick={() => navigate("/signup")}>
                                회원가입
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Login;
