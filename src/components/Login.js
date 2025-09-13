import {useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/Login.css";
import axios from "axios";

axios.defaults.withCredentials = true;

function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const error = params.get("error");

        if (error === "email_exists") {
            setErrorMessage("이미 등록된 이메일입니다.");
            navigate("/login", { replace: true });
        }
    }, [location.search, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();

        const userData = {
            username: id,
            password: password,
        };

        console.log("Login 시도, 요청 바디:", userData);

        const url = `${process.env.REACT_APP_SPRING_API_URL}/api/login`;

        axios
            .post(url, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                // 토큰은 보통 response.data.token 또는 response.headers['authorization']에 올 수 있음
                let token = null;
                if (response.data?.token) {
                    token = response.data.token;
                } else if (response.headers?.authorization) {
                    token = response.headers.authorization;
                } else if (response.headers?.Authorization) {
                    token = response.headers.Authorization;
                }

                if (token) {
                    // Bearer 토큰 형태라면 앞에 "Bearer " 제거
                    if (token.startsWith("Bearer ")) {
                        token = token.substring(7);
                    }
                    localStorage.setItem("jwtToken", token);
                    alert(`${id}님 환영합니다!`);
                    navigate("/");
                } else {
                    alert("로그인에 실패했습니다. 토큰이 없습니다.");
                }
            })
            .catch((error) => {
                const msg = error.response?.data?.message || "로그인 실패";
                alert(msg);
            });
    }

    // OAuth2 로그인 버튼 클릭 시 브라우저 리다이렉트
    const handleOAuthLogin = (provider) => {
        window.location.href = `${process.env.REACT_APP_SPRING_API_URL}/oauth2/authorization/${provider}`;


    };

    return (
        <div className="Login">
            <header className="Login-header">
                <div className="Login-home-container">
                    <button className="Login-home-button" type="button" onClick={() => navigate("/")}>
                        <img
                            className="Login-home-button-img"
                            src="/snake.png"
                            alt="타이틀 이미지"
                        />
                    </button>
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
                        {errorMessage && (
                            <div style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
                                {errorMessage}
                            </div>
                        )}
                        {/* 아이디 입력 */}
                        <div className="Login-element-container">
                            <p className="Login-id-box">ID</p>
                            <input
                                className="Login-id-textbox"
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                placeholder="아이디 입력"
                            />
                        </div>

                        {/* 비밀번호 입력 */}
                        <div className="Login-element-container">
                            <p className="Login-pw-box">PW</p>
                            <input
                                className="Login-pw-textbox"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호 입력"
                            />
                        </div>

                        {/* 로그인 버튼 */}
                        <div className="Login-login-container">
                            <button className="Login-login-button" onClick={handleLogin}>
                                로그인
                            </button>
                        </div>

                        {/* 메뉴 버튼들 */}
                        <div className="Login-menu-container">
                            <button
                                className="Login-menu-button"
                                type="button"
                                onClick={() => navigate("/idfind")}
                            >
                                ID 찾기
                            </button>
                            <button
                                className="Login-menu-button"
                                type="button"
                                onClick={() => navigate("/pwfind")}
                            >
                                PW 찾기
                            </button>
                            <button
                                className="Login-menu-button"
                                type="button"
                                onClick={() => navigate("/signup")}
                            >
                                회원가입
                            </button>
                        </div>

                        {/* --- 여기부터 OAuth2 로그인 버튼 추가 --- */}
                        <div className="Login-easy-login-container">
                            <p className="Login-easy-login-text">간편 로그인</p>
                            <button onClick={() => handleOAuthLogin("google")}>
                                <img
                                    className="Login-easy-login"
                                    src="/google.svg"
                                    alt="타이틀 이미지"
                                />
                            </button>
                            <button onClick={() => handleOAuthLogin("naver")}>
                                <img
                                    className="Login-easy-login"
                                    src="/naver.png"
                                    alt="타이틀 이미지"
                                />
                            </button>
                            <button onClick={() => handleOAuthLogin("kakao")}>
                                <img
                                    className="Login-easy-login"
                                    src="/kakao.png"
                                    alt="타이틀 이미지"
                                />
                            </button>

                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Login;