import { useState } from "react";
import "./AccountFind.css";

function AccountFind() {
    const [birthDate, setBirthDate] = useState(''); // 초깃값 설정

    const handleDateChange = (e) => {
        setBirthDate(e.target.value); // 선택된 날짜를 상태로 저장
    }

    const handleAccount = () => {
        alert(`ID/PW 찾기 시도`);
    };


    return (
        <div className="AccountFind">
            <header className="AccountFind-header">
                <h1>We go high</h1>
                <div className="Container">
                    <div className="Container-e">
                        <div className="Container-name">
                            <p className="Name-box">이름</p>
                            <input className="Name-textbox"/>
                        </div>

                        <div className="Container-birth">
                            <p className="Birth-box">생년월일</p>
                            <input
                                className="Birth-textbox"
                                type="date"
                                id="startDate"
                                value={birthDate} // 상태에 바인딩
                                onChange={handleDateChange} // 사용자 입력 처리
                                max="9999-12-31"
                            />

                        </div>

                        <div className="Container-find">
                            <button className="Find-button" onClick={handleAccount}>
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
