import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/App.css';

function HomeLoginVer() {
    const navigate = useNavigate();
    const [profileBox, setProfileBox] = useState(false);

    const profileToggleBox = () => {
        setProfileBox(!profileBox);
    };

    return (
        <div className="Home">
            <header className="Home-header">
                <div className="Home-title">
                    <button className="Home-home-button" type="button" onClick={() => navigate("/homeloginver")}>We go high</button>
                    <img className="Home-profile-img" src="/profile.png" alt="프로필" onClick={profileToggleBox} />
                </div>

                {profileBox && (
                    <div className="Home-profileBox" id="myBox">
                        <button className="Home-profileBox-element" onClick={() => navigate("/mypage")}>내 정보</button>
                        <button className="Home-profileBox-element" onClick={() => navigate("/")}>로그아웃</button>
                    </div>
                )}

                <p className="Home-body">정보를 원하는 기사의 URL을<br />입력해 보세요.</p>
                <div className="Home-Search">
                    <input id="Home-search-input" placeholder="뉴스 URL을 입력하세요." />
                    <img className="Home-search-img" src="/icon.png" alt="돋보기" onClick={() => navigate("/newsloginver")}/>
                </div>
            </header>
        </div>
    );
}

export default HomeLoginVer;
