import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../css/SignUp.css";
import axios from "axios";

function SignUp() {
    const [birthDate, setBirthDate] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [authNum, setAuthNum] = useState("");
    const [authCheck, setAuthCheck] = useState(false);
    const [elementBox, setElementBox] = useState(false);
    const [sameValue,setSameValue] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0); // 초 단위
    const [isExpired, setIsExpired] = useState(null);
    const [sending, setSending] = useState(false);
    const [isRequested, setIsRequested] = useState(false);

    const navigate = useNavigate();
    const handleDateChange = (e) => {
        setBirthDate(e.target.value); // 선택된 날짜를 상태로 저장
    }
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const elementToggleBox = () => {
        setElementBox(!elementBox);
    }

    const handleSignUp = (e) => {
        e.preventDefault();

        if (name === "") {
            alert("이름을 입력하세요.");
        } else if (birthDate === "") {
            alert("생년월일을 입력하세요.");
        } else if (id === "") {
            alert("아이디를 입력하세요.");
        } else if (password === "") {
            alert("비밀번호를 입력하세요.");
        }else if (password.length < 8 || password.length > 16) {
            alert("비밀번호 길이는 최소 8글자 최대 16글자입니다.")
        } else if (email === "") {
            alert("이메일을 입력하세요.")
        } else if (!authCheck) {
            alert("이메일 인증을 확인해주세요")
        }
            // } else if (!isValidEmail(email)){
            //     alert("적절한 이메일 형식이 아닙니다")
        // }
        else if (!sameValue) {
            alert("아이디 중복을 체크하세요.");
        } else {
            const userData = {
                birthDate: birthDate,
                name: name,
                username: id,
                password: password,
                email: email
            };

            const url = `http://localhost:8080/api/signup`;

            axios
                .post(url, userData)
                .then((response) => {
                    alert(`${id}님 회원가입 성공`);
                    navigate("/");
                })
                .catch((err) => {
                    const msg = err.response?.data || "회원가입 실패"
                    alert(msg);
                });
        }
    };

    const handleSame = (e) => {
        e.preventDefault();
        const userData = {
            username: id,
        };

        console.log("보내는 ID:", userData.username);
        axios.get(`http://localhost:8080/api/signup/IdCheck/${userData.username}`)
            .then((response) =>{
                if(response.data === true){
                    alert('사용 가능한 아이디입니다')
                    setSameValue(true);
                } else {
                    alert('중복된 아이디입니다')
                    setSameValue(false);

                }

            }).catch((_error) => {
            alert('적절한 값을 입력하세요')
            setSameValue(false)
        });
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            alert("적절한 이메일 형식이 아닙니다")
            return;
        }
        if (timeLeft > 0) {
            alert("인증번호 유효시간이 남아있습니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        setSending(true);
        const userData = {
            mail: email,
        };
        const url = `http://localhost:8080/api/mailSend`;

        axios
            .post(url, userData)
            .then((response) => {
                alert(`인증번호 발송되었습니다`);

                setTimeLeft(300);
                setIsExpired(false);
                setIsRequested(true);
            })
            .catch((err) => {
                const msg = err.response?.data
                alert(msg);
                alert("작성하신 이메일을 다시 확인해주세요.")
            })
            .finally(() => {
                setSending(false)
            });


    };

    const handleCheck = (e) => {
        e.preventDefault();
        if (isExpired) {
            alert("인증 시간이 만료되었습니다. 다시 요청해주세요.");
            return;
        }
        axios.get(`http://localhost:8080/api/mailCheck?authNum=${authNum}`)
            .then((response) => {
                alert(response.data); // "인증이 완료되었습니다."
                setAuthCheck(true);
                setTimeLeft(0);
                setIsExpired(false);
            })
            .catch((err) => {
                alert(err.response?.data); // "인증 실패: 번호가 일치하지 않습니다."
                setAuthCheck(false);
            });
    };

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsExpired(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // 타이머 UI 변환
    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <div className="SignUp">
            <div className="SignUp-img"></div>
            <header className="SignUp-header">
                <div className="SignUp-home-container">
                    <button className="SignUp-home-button" type="button" onClick={() => navigate("/")}>
                        <img
                            className="SignUp-home-button-img"
                            src="/snake.png"
                            alt="타이틀 이미지"
                        />
                    </button>
                </div>
                <div className="SignUp-location-container">
                    <div className="SignUp-location-element">
                        <div className="SignUp-location">
                            <button className="SignUp-location-button" type="button"
                                    onClick={() => navigate("/")}>홈
                            </button>
                        </div>
                        <div className="SignUp-location-down"></div>
                        <div className="SignUp-location">
                            <button className="SignUp-location-button" type="button"
                                    onClick={() => navigate("/login")}>로그인
                            </button>
                        </div>
                        <div className="SignUp-location-down"></div>
                        <div className="SignUp-location">
                            <button className="SignUp-Box-element" onClick={elementToggleBox}>회원가입</button>
                        </div>

                        {elementBox && (
                            <div className="SignUp-Box" id="myBox">
                                <button className="SignUp-Box-element" onClick={() => {
                                    setElementBox(false);
                                    navigate("/idfind")}}>아이디 찾기
                                </button>
                                <button className="SignUp-Box-element" onClick={() => {
                                    setElementBox(false);
                                    navigate("/pwfind")}}>비밀번호 찾기
                                </button>
                                <button className="SignUp-Box-element" onClick={() => {
                                    setElementBox(false);
                                    navigate("/signup")}}>회원가입
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="SignUp-container">
                    <div className="SignUp-container-element">
                        <div className="SignUp-element-container">
                            <p className="SignUp-element-box">이름</p>
                            <input
                                className="SignUp-textbox"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="이름 입력"/>
                            <p className="SignUp-element-box">생년월일</p>
                            <input
                                className="SignUp-textbox"
                                type="date"
                                id="startDate"
                                value={birthDate}
                                onChange={handleDateChange}
                                max="9999-12-31"
                            />
                        </div>
                        <div className="SignUp-element-container">
                            <p className="SignUp-element-box">아이디</p>
                            <input
                                className="SignUp-textbox"
                                type="text"
                                value={id}
                                onChange={(e) => {
                                    setId(e.target.value);
                                    setSameValue(false);
                                }}
                                placeholder="아이디 입력"/>
                            <div className="SignUp-same-box">
                                <button className="SignUp-same-button" onClick={handleSame}>
                                    중복확인
                                </button>
                            </div>
                        </div>

                        <div className="SignUp-element-container">
                            <p className="SignUp-element-box">비밀번호</p>
                            <input className="SignUp-textbox"
                                   type="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   minLength="8"
                                   maxLength="16"
                                   placeholder="비밀번호 입력"/>
                        </div>

                        <div className="SignUp-element-container">
                            <p className="SignUp-element-box">이메일</p>
                            <input className="SignUp-textbox"
                                   type="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   placeholder="example@example.com"/>
                            <div className="SignUp-auth-box">
                                <button className="SignUp-auth-button" onClick={handleSend} disabled={sending}>
                                    {sending ? "전송 중..." : "인증번호 전송"}
                                </button>
                                {timeLeft > 0 && !authCheck && <p className="SignUp-timer">남은 시간: {formatTime(timeLeft)}</p>}
                            </div>
                        </div>

                        <div className="SignUp-element-container">
                            <p className="SignUp-element-box">인증번호</p>
                            <input className="SignUp-textbox"
                                   type="text"
                                   value={authNum}
                                   onChange={(e) => setAuthNum(e.target.value)}
                                   placeholder="인증번호 입력"/>
                            <div className="SignUp-same-box">
                                <button
                                    className="SignUp-same-button"
                                    onClick={handleCheck}
                                    disabled={authCheck}
                                >
                                    {authCheck ? "확인 완료" : "확인"}
                                </button>
                                {!authCheck && isExpired && isRequested && (
                                    <p style={{ color: "red" }}>인증 시간이 만료되었습니다. 다시 요청해주세요.</p>
                                )}
                            </div>
                        </div>

                        <div className="SignUp-container-signup">
                            <button className="Sign-up-button" onClick={handleSignUp}>
                                회원가입
                            </button>
                        </div>

                    </div>
                </div>

            </header>
        </div>
    );
}

export default SignUp;
