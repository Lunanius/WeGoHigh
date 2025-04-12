import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Find.css";

function PwFind() {
    const [birthDate, setBirthDate] = useState("");
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");

    const handleDateChange = (e) => {
        setBirthDate(e.target.value); // 선택된 날짜를 상태로 저장
    }

    const handlePw = () => {
        console.log("Name:", name);
        console.log("BirthDate:", birthDate);
        console.log("Id:", id);
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
        else if (id === "") {
            alert("아이디를 입력하세요.")
        }
        else {
            if (name === {name} && birthDate === {birthDate} && email === {email} && id === {id}) {
                alert(`사용자 이름: ${name} \n사용자 생년월일: ${birthDate} \n사용자 이메일: ${email} \n사용자 아이디: ${id}`);
                //alert(`사용자 비밀번호: ${password}`)
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
                    <div className="Find-location">
                        <button className="Find-location-button" type="button"
                                onClick={() => navigate("/pwfind")}>PW 찾기
                        </button>
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

                        <div className="Find-element-container">
                            <p className="Find-element-box">ID</p>
                            <input className="Find-element-textbox"
                                   type="text"
                                   value={id}
                                   onChange={(e) => setId(e.target.value)}
                                   placeholder="ID 입력"/>
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
