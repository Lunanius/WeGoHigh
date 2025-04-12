import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Home.css';
import axios from "axios";


function Home() {
    const navigate = useNavigate();
    const [profileBox, setProfileBox] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const profileToggleBox = () => {
        setProfileBox(!profileBox);
    };

    useEffect(() => {
        axios.get("http://localhost:8080/api/session-user", { withCredentials: true })
            .then(res => {
                setUserInfo(res.data);
            })
            .catch((err) => {
                setUserInfo(null);
            });
    }, []);

    const handleLogout = () => {
        axios.post("http://localhost:8080/api/logout", {}, { withCredentials: true })
            .finally(() => {
                setUserInfo(null);
                setProfileBox(false);
                navigate("/");
            });
    };

    const isLogin = !!userInfo?.username;

    return (
        <div className="Home">
            <header className="Home-header">
                <div className="Home-home-container">
                    <button className="Home-home-button" type="button" onClick={() => navigate("/")}>We go high</button>
                    <div className="Home-button-container">
                        {isLogin ? (
                            <img className="Home-profile-img" src="/profile.png" alt="프로필" onClick={profileToggleBox}/>
                        ) : (
                            <>
                                <button className="Home-login-button" type="button" onClick={() => navigate("/login")}>
                                    로그인
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {isLogin && profileBox && (
                    <div className="Home-profileBox" id="myBox">
                        <button className="Home-profileBox-element" onClick={() => navigate("/mypage")}>내 정보</button>
                        <button className="Home-profileBox-element" onClick={() =>handleLogout()}>로그아웃</button>
                    </div>
                )}

                <p className="Home-body">정보를 원하는 기사의 URL을<br />입력해 보세요.</p>

                <div className="Home-Search">
                    <input id="Home-search-input" placeholder="뉴스 URL을 입력하세요." />
                    <img
                        className="Home-search-img"
                        src="/icon.png"
                        alt="돋보기"
                        onClick={() => navigate("/news")}
                    />
                </div>

                {!isLogin ? (
                    <p className="Home-tail">
                        로그인해서 전에 검색했던 내용을<br />다시 확인하세요!
                    </p>
                ) : (
                    <div>
                        <p>여기에 최근 검색했던 뉴스 이미지 제목 가게끔??</p>
                    </div>
                )}
            </header>
        </div>
    );
}

export default Home;
