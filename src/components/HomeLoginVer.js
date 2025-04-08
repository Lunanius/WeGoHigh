import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/App.css';

function HomeLoginVer() {
    const navigate = useNavigate();
    const [profileBox, setProfileBox] = useState(false);
    const [resetPasswordBox, setResetPasswordBox] = useState(false);

    const toggleBox = () => {
        setProfileBox(!profileBox);
        if(resetPasswordBox === true){
            setResetPasswordBox(!resetPasswordBox)
        }
    };

    const toggleBox2 = () => {
        setResetPasswordBox(!resetPasswordBox)
    }

    return (
        <div className="Home">
            <header className="Home-header">
                <div className="Home-title">
                    <button className="Home-home-button" type="button" onClick={() => navigate("/")}>We go high</button>
                    <img className="Home-profile-img" src="/profile.png" alt="프로필" onClick={toggleBox} />
                </div>

                {profileBox && (
                    <div className="ProfileBox" id="myBox">
                        <button className="ProfileBox-logout" onClick={() => navigate("/")}>최근 기록</button>
                        <button className="ProfileBox-logout" onClick={toggleBox2}>비밀번호 변경</button>
                        <button className="ProfileBox-logout" onClick={() => navigate("/")}>로그아웃</button>

                        {resetPasswordBox && (
                            <div className="ResetPasswordBox" id="myBox">
                                <p>비밀번호 재설정</p>
                            </div>
                        )

                        }
                    </div>
                )}

                <p className="Home-body">정보를 원하는 기사의 URL을<br />입력해 보세요.</p>
                <div className="Home-Search">
                    <input id="Home-search-input" placeholder="뉴스 URL을 입력하세요." />
                    <img className="Home-search-img" src="/icon.png" alt="돋보기" onClick={() => navigate("/newsloginver")}/>
                </div>
                <p className="Home-tail">로그인해서 전에 검색했던 내용을<br />다시 확인하세요!</p>
            </header>
        </div>
    );
}

export default HomeLoginVer;
