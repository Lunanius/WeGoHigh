import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Find.css";
import axios from "axios";

function IdFind() {
    const [birthDate, setBirthDate] = useState("");
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleDateChange = (e) => {
        setBirthDate(e.target.value); // 선택된 날짜를 상태로 저장
    }

    const handleId = () => {
        if (name === "") {
            alert("이름을 입력하세요.")
        } else if (birthDate === "") {
            alert("생년월일을 입력하세요.")
        } else if (email === "") {
            alert("이메일을 입력하세요.")
        } else {
            const userData = {
                name: name,
                birthDate: birthDate,
                email: email
            };

            const url = `http://localhost:8080/api/IdFind`;

            axios
                .post(url, userData)
                .then((response) => {
                    alert(`${name}님의 아이디는 ${response?.data} 입니다`);
                    navigate('/Login');
                })
                .catch((error) => {
                    const msg = error.response?.data || '입니다';
                    alert(msg);
                });
        }
    }


    return (
        <div className="Find">
            <header className="Find-header">
                <button className="Find-home-button" type="button" onClick={() => navigate("/")}>We go high</button>
                <div className="Find-container">
                    <div className="Find-container-element">
                        <div className="Find-element-container">
                            <p className="Find-name-box">아이디</p>
                            <input
                                className="Find-element-textbox"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="이름 입력"/>
                        </div>

                        <div className="Find-element-container">
                            <p className="Find-birth-box">생년월일</p>
                            <input
                                className="Find-element-textbox"
                                type="date"
                                id="startDate"
                                value={birthDate}
                                onChange={handleDateChange}
                                max="9999-12-31"
                            />
                        </div>
                        <div className="Find-container-element">
                            <div className="Find-element-container">
                                <p className="Find-name-box">이메일</p>
                                <input
                                    className="Find-element-textbox"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@example.com"/>
                            </div>
                        </div>


                        <div className="Find-find-container">
                            <button className="Find-find-button" onClick={handleId}>
                                ID 찾기
                            </button>
                        </div>

                    </div>
                </div>

            </header>
        </div>
    )
}

export default IdFind;
