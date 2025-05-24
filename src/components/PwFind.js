import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Find.css";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;


function PwFind() {
    const [birthDate, setBirthDate] = useState("");
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    // const [email, setEmail] = useState("");
    const [elementBox, setElementBox] = useState(false);

    const handleDateChange = (e) => {
        setBirthDate(e.target.value); // 선택된 날짜를 상태로 저장
    }

    const elementToggleBox = () => {
        setElementBox(!elementBox);
    }

    const handlePw = () => {
        alert("회원의 정보가 확인되면 임시비밀번호가 생성됩니다\n" +
            "비밀번호를 복사해주세요")
        console.log("Name:", name);
        console.log("BirthDate:", birthDate);
        console.log("Id:", id);
        console.log("==========================");
        if (name === "") {
            alert("이름을 입력하세요.")
        }
        else if (birthDate === "") {
            alert("생년월일을 입력하세요.")
        }
        else if (id === "") {
            alert("아이디를 입력하세요.")
        }
        else {
            const userData = {
                name: name,
                birthDate: birthDate,
                username: id
            };

            const url = `http://localhost:8080/api/pwFind`;

            axios
                .post(url, userData)
                .then((response) => {
                    if (window.confirm(`${name}님의 임시 비밀번호는 "${response?.data}"입니다.\n복사하시겠습니까?`)) {
                        navigator.clipboard.writeText(response?.data)
                            .then(() => {
                                alert("복사되었습니다!\n" +
                                    "내 정보에서 비밀번호를 변경해주세요!");
                            })
                            .catch((err) => {
                                alert("복사 실패: " + err);
                            });
                    }
                    navigate('/Login');
                })
                .catch((error) => {
                    const msg = error.response?.data || '입니다';
                    alert(msg);
                });
        }

    };


    return (
        <div className="Find">
            <div className="Find-img"></div>
            <header className="Find-header">
                <div className="Find-home-container">
                    <button className="Find-home-button" type="button" onClick={() => navigate("/")}>
                        <img
                            className="Find-home-button-img"
                            src="/snake.png"
                            alt="타이틀 이미지"
                        />
                    </button>
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
                            <button className="Find-Box-element" onClick={elementToggleBox}>비밀번호 찾기</button>
                        </div>

                        {elementBox && (
                            <div className="Find-Box" id="myBox">
                                <button className="Find-Box-element" onClick={() => {
                                    setElementBox(false);
                                    navigate("/idfind")}}>아이디 찾기
                                </button>
                                <button className="Find-Box-element" onClick={() => {
                                    setElementBox(false);
                                    navigate("/pwfind")}}>비밀번호 찾기
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

                        {/* 이메일 기능 */}
                        {/*<div className="Find-element-container">*/}
                        {/*    <p className="Find-element-box">이메일</p>*/}
                        {/*    <input*/}
                        {/*        className="Find-element-textbox"*/}
                        {/*        type="email"*/}
                        {/*        value={email}*/}
                        {/*        onChange={(e) => setEmail(e.target.value)}*/}
                        {/*        placeholder="example@example.com"/>*/}
                        {/*</div>*/}

                        <div className="Find-element-container">
                            <p className="Find-element-box">아이디</p>
                            <input className="Find-element-textbox"
                                   type="text"
                                   value={id}
                                   onChange={(e) => setId(e.target.value)}
                                   placeholder="아이디 입력"/>
                        </div>

                        <div className="Find-find-container">
                            <button className="Find-find-button" onClick={handlePw}>
                                PW 찾기
                            </button>
                        </div>

                    </div>
                </div>

            </header>
        </div>
    );
}

export default PwFind;
