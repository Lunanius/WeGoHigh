import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Find.css";

function IdFind() {
    const [birthDate, setBirthDate] = useState("");
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const handleDateChange = (e) => {
        setBirthDate(e.target.value); // 선택된 날짜를 상태로 저장
    }

    const handleId = () => {
        console.log("Name:", name);
        console.log("BirthDate:", birthDate);
        console.log("==========================");
        if (name === "") {
            alert("이름을 입력하세요.")
        }
        else if (birthDate === "") {
            alert("생년월일을 입력하세요.")
        }
        else {
            if (name === {name} && birthDate === {birthDate}) {
                alert(`사용자 이름: ${name} \n사용자 생년월일: ${birthDate}`);
                //alert(`사용자 아이디: ${id}`)
            }
            else {
                alert("존재하지 않는 회원정보입니다.")
            }
        }

    };

    return (
        <div className="Find">
            <header className="Find-header">
                <button className="Find-home-button" type="button" onClick={() => navigate("/")}>We go high</button>
                <div className="Find-container">
                    <div className="Find-container-element">
                        <div className="Find-element-container">
                            <p className="Find-name-box">이름</p>
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

                        <div className="Find-find-container">
                            <button className="Find-find-button" onClick={handleId}>
                                ID 찾기
                            </button>
                        </div>

                    </div>
                </div>

            </header>
        </div>
    );
}

export default IdFind;
