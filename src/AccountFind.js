import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountFind.css";

function AccountFind() {
    const [birthDate, setBirthDate] = useState("");
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const handleDateChange = (e) => {
        setBirthDate(e.target.value); // 선택된 날짜를 상태로 저장
    }

    const handleAccount = () => {
        console.log("Name:", name);
        console.log("BirthDate:", birthDate);
        console.log("==========================");
        alert(`ID/PW 찾기 시도`);
        if (name === "" && birthDate === "" ){
            alert("ID/PW 찾기 시도 실패")
        }
        else {
            alert("ID/PW 찾기 시도 성공")
            alert(`사용자 이름: ${name} \n사용자 생년월일: ${birthDate}`);
            //alert(`사용자 아이디: ${id} \n사용자 비밀번호: ${password}`)
        }

    };

    return (
        <div className="AccountFind">
            <header className="AccountFind-header">
                <button className="AccountFind-home-button" type="button" onClick={() => navigate("/")}>We go high</button>
                <div className="AccountFind-container">
                    <div className="AccountFind-container-element">
                        <div className="AccountFind-element-container">
                            <p className="AccountFind-name-box">이름</p>
                            <input
                                className="AccountFind-element-textbox"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="AccountFind-element-container">
                            <p className="AccountFind-birth-box">생년월일</p>
                            <input
                                className="AccountFind-element-textbox"
                                type="date"
                                id="startDate"
                                value={birthDate}
                                onChange={handleDateChange}
                                max="9999-12-31"
                            />

                        </div>

                        <div className="AccountFind-find-container">
                            <button className="AccountFind-find-button" onClick={handleAccount}>
                                ID/PW 찾기
                            </button>
                        </div>

                    </div>
                </div>

            </header>
        </div>
    );
}

export default AccountFind;
