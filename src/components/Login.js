import { useState} from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import axios from "axios";


axios.defaults.withCredentials = true;

function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // const handleLogin = () => {
    //     console.log("ID:", id);
    //     console.log("Password:", password);
    //     console.log("==========================");
    //     if (id === "") {
    //         alert("아이디를 입력하세요.")
    //     }
    //     else if (password === "") {
    //         alert("비밀번호를 입력하세요.")
    //     }
    //     else if (password.length < 8 || password.length > 16) {
    //         alert("비밀번호 길이는 최소 8글자 최대 16글자입니다.")
    //     }
    //     else {
    //         if (id === {id} && password === {password}) {
    //             alert("로그인 성공!")
    //             setIsLogin(true);
    //             sessionStorage.setItem("isLogin", "true");
    //             sessionStorage.setItem("userName", name);
    //             sessionStorage.setItem("userBirthDate", birthDate);
    //             sessionStorage.setItem("userId", id);
    //             navigate("/");
    //         }
    //         else {
    //             alert("존재하지 않는 아이디 또는 비밀번호입니다.")
    //         }
    //     }
    // };

    const handleLogin = (e) => {
        e.preventDefault();
        const userData = {
            username: id,
            password: password
        };

        const url = `http://localhost:8080/api/login`;

        axios.defaults.withCredentials = true;
        axios
            .post(url, userData)
            .then((response) => {
                alert(`${id}님 환영합니다!`);
                navigate('/');
            })
            .catch((error) => {
                const msg = error.response?.data || "로그인 실패"
                alert(msg);
            });
    }



    return (
        <div className="Login">
            <header className="Login-header">
                <div className="Login-home-container">
                    <button className="Login-home-button" type="button" onClick={() => navigate("/")}>We go high</button>
                </div>
                <div className="Login-location-container">
                    <div className="Login-location-element">
                        <div className="Login-location">
                            <button className="Login-location-button" type="button"
                                    onClick={() => navigate("/")}>홈
                            </button>
                        </div>
                        <div className="Login-location-down"></div>
                        <div className="Login-location">
                            <button className="Login-location-button" type="button"
                                    onClick={() => navigate("/login")}>로그인
                            </button>
                        </div>
                    </div>
                </div>
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

                        <div className="Login-login-container">
                            <button className="Login-login-button" onClick={handleLogin}>
                                로그인
                            </button>
                        </div>

                        <div className="Login-menu-container">
                            <button className="Login-menu-button" type="button" onClick={() => navigate("/idfind")}>
                                ID 찾기
                            </button>
                            <button className="Login-menu-button" type="button" onClick={() => navigate("/pwfind")}>
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
