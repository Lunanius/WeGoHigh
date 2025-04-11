import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SignUp.css";
import axios from "axios";

function SignUp() {
    const [birthDate, setBirthDate] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail] = useState("");
    let [samevalue, setSamevalue] = useState(false);
    const navigate = useNavigate();

    const handleDateChange = (e) => {
        setBirthDate(e.target.value); // 선택된 날짜를 상태로 저장
    }
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        if (name === "") {
            alert("이름을 입력해주세요.");
        } else if (birthDate === "") {
            alert("날짜를 입력해주세요.");
        } else if (id === "") {
            alert("아이디를 입력해주세요.");
        } else if (password === "") {
            alert("비밀번호를 입력해주세요.");
        } else if (email === ""){
            alert("이메일을 입력해주세요.");
        } else if (!isValidEmail(email)) {
            alert("유효한 이메일 형식이 아닙니다.");
        } else if (!samevalue) {
            alert("아이디 중복을 체크해주세요.");
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
                    setSamevalue(true);
                } else {
                    alert('중복된 아이디입니다')
                    setSamevalue(false);

                }

            }).catch((error) => {
                alert('적절한 값을 입력하세요')
                setSamevalue(false)
        });
    };


    return (
        <div className="SignUp">
            <header className="SignUp-header">
                <button className="AccountFind-home-button" type="button" onClick={() => navigate("/")}>We go high</button>
                <div className="SignUp-container">
                    <div className="SignUp-container-element">
                        <div className="SignUp-element-container">
                            <p className="SignUp-element-box">이름</p>
                            <input
                                className="SignUp-textbox"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="SignUp-element-container">
                            <p className="SignUp-birth-box">생년월일</p>
                            <input
                                className="SignUp-textbox"
                                type="date"
                                id="startDate"
                                value={birthDate}
                                onChange={handleDateChange}
                                max="9999-12-31"
                            />

                        </div>
                        <div className="SignUp-element-container-id">
                            <p className="SignUp-element-box">아이디</p>
                            <input
                                className="SignUp-textbox"
                                type="text"
                                value={id}
                                onChange={(e) => {
                                    setId(e.target.value);
                                     setSamevalue(false);
                                }}
                                maxLength="10"
                                placeholder="아이디 입력"/>
                            <button className="SignUp-same-button" onClick={handleSame}>
                                중복확인
                            </button>
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
