import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
    const [birthDate, setBirthDate] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [samevalue, setSamevalue] = useState(false);
    const handleDateChange = (e) => {
        setBirthDate(e.target.value); // 선택된 날짜를 상태로 저장
    }

    const handleSignUp = () => {
        console.log("Name:", name);
        console.log("BirthDate:", birthDate);
        console.log("Id:", id);
        console.log("Password:", password);
        console.log("==========================");
        if (name !== "" && birthDate !== "" && id !== "" && password !== "" && samevalue === true) {
            alert("회원가입 성공");
        }
        else {
            alert("다시 시도해보세요")
        }
    };

    const handleSame = () => {
        console.log("Id:", id);
        if (id === {id}) {
            alert(`해당 아이디는 중복되어 사용할 수 없습니다.`)
            setSamevalue(false);
        }
        else {
            alert(`해당 아이디는 사용할 수 있습니다.`)
            setSamevalue(true);
        }
    }

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
                            <p className="SignUp-element-box">ID</p>
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
                            <p className="SignUp-element-box">PW</p>
                            <input className="SignUp-textbox"
                                   type="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   minLength="8"
                                   maxLength="16"
                                   placeholder="비밀번호 입력"/>
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
