import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SignUp.css";
import axios from "axios";


function SignUp() {
    const [birthDate, setBirthDate] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [elementBox, setElementBox] = useState(false);

    let [samevalue, setSamevalue] = useState(false);
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
        } else if (email === ""){
            alert("이메일을 입력하세요.")
        } else if (!isValidEmail(email)){
            alert("적절한 이메일 형식이 아닙니다")
        }
        else if (!samevalue) {
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
                .catch((error) => {
                    alert("회원가입 실패");
                });
        }
    };

    const handleIdSame = (e) => {
        e.preventDefault();
        const userData = {
            username: id,
        };

    // const handleEmailSame = (e) => {
    //     e.preventDefault();
    //     const userData = {
    //         email: email,
    //     };

        console.log("보내는 ID:", userData.username);
        axios.get(`http://localhost:8080/api/signup/IdCheck/${userData.username}`)
            .then((response) =>{
                if(response.data === true){
                    alert('사용 가능한 아이디입니다')
                    setSamevalue(true);
                } else {
                    alert('중복된 아이디입니다')
                    setSamevalue(false);

                }

            }).catch((_error) => {
            alert('적절한 값을 입력하세요')
            setSamevalue(false)
        });
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
                                    setSamevalue(false);
                                }}
                                placeholder="아이디 입력"/>
                            <div className="SignUp-same-box">
                                <button className="SignUp-same-button" onClick={handleIdSame}>
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
                        </div>

                        <div className="SignUp-element-container">
                            <p className="SignUp-element-box">인증번호</p>
                            <input
                                className="SignUp-textbox"
                                type="text"
                                value={id}
                                onChange={(e) => {
                                    setId(e.target.value);
                                    setSamevalue(false);
                                }}
                                placeholder="인증번호 입력"/>
                            <div className="SignUp-same-box">
                                <button className="SignUp-same-button" onClick={handleIdSame}>
                                    중복확인
                                </button>
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
