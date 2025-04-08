import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MyPage.css";

function MyPage() {
    const navigate = useNavigate();
    const [newpassword, setNewPassword] = useState("");
    const [resetPasswordBox, setResetPasswordBox] = useState(false);
    const [profileBox, setProfileBox] = useState(false);

    const handleResetPassword = () => {
        if (newpassword.length < 8 || newpassword.length > 16) {
            alert("비밀번호 길이는 최소 8글자 최대 16글자입니다.")
        }
        else {
            // 유저의 비밀번호가 sql에 갱신하는 코드
        }
    }

    const profileToggleBox = () => {
        setProfileBox(!profileBox);
    };

    const resetPasswordToggleBox = () => {
        setResetPasswordBox(!resetPasswordBox)
    };

    return (
        <div className="MyPage">
            <header className="MyPage-header">
                <button className="MyPage-home-button" type="button" onClick={() => navigate("/homeloginver")}>We go high</button>
                <img className="MyPage-profile-img" src="/public/profile.png" alt="프로필" onClick={profileToggleBox} />

                {profileBox && (
                    <div className="MyPage-profileBox" id="myBox">
                        <button className="MyPage-profileBox-element" onClick={() => navigate("/mypage")}>내 정보</button>
                        <button className="MyPage-profileBox-element" onClick={() => navigate("/")}>로그아웃</button>
                    </div>
                )}

                <div className="MyPage-container">
                    <div className="MyPage-container-element">
                        <div className="MyPage-element">
                            <p>이름</p>
                        </div>
                        <div className="MyPage-element-value">
                            <p>진짜 이름</p>
                        </div>
                    </div>

                    <div className="MyPage-container-element">
                        <div className="MyPage-element">
                            <p>생년월일</p>
                        </div>
                        <div className="MyPage-element-value">
                            <p>진짜 생년월일</p>
                        </div>
                    </div>

                    <div className="MyPage-container-element">
                        <div className="MyPage-element">
                            <p>아이디</p>
                        </div>
                        <div className="MyPage-element-value">
                            <p>진짜 아이디</p>
                        </div>
                    </div>

                    <div className="MyPage-container-element">
                        <div className="MyPage-element">
                            <p>비밀번호</p>
                        </div>
                        <div className="MyPage-element-value">
                            <button className="MyPage-element-button" onClick={resetPasswordToggleBox}>변경</button>
                        </div>

                        {resetPasswordBox && (
                            <div className="ResetPasswordBox" id="myBox">
                                <input
                                    className="Reset-password-textbox"
                                    type="password"
                                    value={newpassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    minLength="8"
                                    maxLength="16"
                                    placeholder="비밀번호 변경"/>
                                <button className="ResetPasswordBox-button" onClick={handleResetPassword}>비밀번호 변경</button>
                            </div>
                        )}

                    </div>

                </div>
            </header>

        </div>
    );
}

export default MyPage;
