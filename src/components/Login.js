import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const storedLogin = sessionStorage.getItem("isLogin");
        if (storedLogin === "true") {
            setIsLogin(true);
        }
    }, []);

    const handleLogin = () => {
        console.log("ID:", id);
        console.log("Password:", password);
        console.log("==========================");
        if (id === "") {
            alert("아이디를 입력하세요.")
        }
        else if (password === "") {
            alert("비밀번호를 입력하세요.")
        }
        else if (password.length < 8 || password.length > 16) {
            alert("비밀번호 길이는 최소 8글자 최대 16글자입니다.")
        }
        else {
            if (id === {id} && password === {password}) {
                alert("로그인 성공!")
                setIsLogin(true);
                sessionStorage.setItem("isLogin", "true");
                sessionStorage.setItem("userName", name);
                sessionStorage.setItem("userBirthDate", birthDate);
                sessionStorage.setItem("userId", id);
                navigate("/");
            }
            else {
                alert("존재하지 않는 아이디 또는 비밀번호입니다.")
            }
        }
    };


    return (
        <div className="Login">
            <header className="Login-header">
                <button className="Login-home-button" type="button" onClick={() => navigate("/")}>We go high</button>
                <div className="Login-container">
                    <div className="Login-container-element">
                        <div className="Login-element-container">
                            <p className="Login-id-box">ID</p>
                            <input
                                className="Login-id-textbox"
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                placeholder="아이디 입력"/>
                        </div>

                        <div className="Login-element-container">
                            <p className="Login-pw-box">PW</p>
                            <input className="Login-pw-textbox"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호 입력"/>
                        </div>

                        <div className="Login-element-container">
                            <button className="Login-login-button" onClick={handleLogin}>
                                로그인
                            </button>
                        </div>

                        <div className="Login-element-container">
                            <button className="Login-menu-button" type="button" onClick={() => navigate("/IdFind")}>
                                ID 찾기
                            </button>
                            <button className="Login-menu-button" type="button" onClick={() => navigate("/PwFind")}>
                                PW 찾기
                            </button>
                            <button className="Login-menu-button" type="button" onClick={() => navigate("/signup")}>
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
