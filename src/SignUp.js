import { useState } from "react";
import "./SignUp.css";
import {useNavigate} from "react-router-dom";

function SignUp() {
    const [birthDate, setBirthDate] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleDateChange = (e) => {
        setBirthDate(e.target.value); // 선택된 날짜를 상태로 저장
    }

    const handleSignUp = () => {
        console.log("Name:", name);
        console.log("BirthDate:", birthDate);
        alert(`회원가입 성공`);
    };

    const handleSame = () => {
        console.log("Id:", id);
        if (id === {id}) {
            alert(`해당 아이디는 중복되어 사용할 수 없습니다.`)
        }
        else {
            alert(`해당 아이디는 사용할 수 있습니다.`)
        }
    }

    return (
        <div className="SignUp">
            <header className="SignUp-header">
                <h1>We go high</h1>
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
                                onChange={(e) => setId(e.target.value)}
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
