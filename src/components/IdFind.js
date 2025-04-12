import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Find.css";

function IdFind() {
    const [birthDate, setBirthDate] = useState("");
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [elementBox, setElementBox] = useState(false);

    const handleDateChange = (e) => {
        setBirthDate(e.target.value); // 선택된 날짜를 상태로 저장
    }

    const elementToggleBox = () => {
        setElementBox(!elementBox);
    }

    const handleId = () => {
        console.log("Name:", name);
        console.log("BirthDate:", birthDate);
        console.log("Email", email);
        console.log("==========================");
        if (name === "") {
            alert("이름을 입력하세요.")
        }
        else if (birthDate === "") {
            alert("생년월일을 입력하세요.")
        }
        else if (email === "") {
            alert("이메일을 입력하세요.")
        }
        else {
            if (name === {name} && birthDate === {birthDate} && email === {email}) {
                alert(`사용자 이름: ${name} \n사용자 생년월일: ${birthDate} \n사용자 이메일: ${email}`);
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
                <div className="Find-home-container">
                    <button className="Find-home-button" type="button" onClick={() => navigate("/")}>We go high</button>
                </div>
                <div className="Find-location-container">
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
                        <div className="Login-location-down"></div>
                        <div className="Login-location">
                            <button className="Find-Box-element" onClick={elementToggleBox}>ID 찾기</button>
                        </div>
                        {elementBox && (
                            <div className="Find-Box" id="myBox">
                                <button className="Find-Box-element" onClick={() => {
                                    setElementBox(false);
                                    navigate("/idfind")}}>ID 찾기
                                </button>
                                <button className="Find-Box-element" onClick={() => {
                                    setElementBox(false);
                                    navigate("/pwfind")}}>PW 찾기
                                </button>
                                <button className="Find-Box-element" onClick={() => {
                                    setElementBox(false);
                                    navigate("/signup")}}>회원가입
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="Find-container">
                    <div className="Find-container-element">
                        <div className="Find-element-container">
                            <p className="Find-element-box">이름</p>
                            <input
                                className="Find-element-textbox"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="이름 입력"/>
                        </div>

                        <div className="Find-element-container">
                            <p className="Find-element-box">생년월일</p>
                            <input
                                className="Find-element-textbox"
                                type="date"
                                id="startDate"
                                value={birthDate}
                                onChange={handleDateChange}
                                max="9999-12-31"
                            />
                        </div>

                        <div className="Find-element-container">
                            <p className="Find-element-box">Email</p>
                            <input
                                className="Find-element-textbox"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일 입력"/>
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
