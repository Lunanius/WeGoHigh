import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Home.css';

function Home() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [profileBox, setProfileBox] = useState(false);

    useEffect(() => {
        const storedLogin = localStorage.getItem("isLogin");
        if (storedLogin === "true") {
            setIsLogin(true);
        }
    }, []);

    const profileToggleBox = () => {
        setProfileBox(!profileBox);
    };

    // 임시 로그인 화면으로 가기 위해 둠
    const handleLogin = () => {
        setIsLogin(true);
        localStorage.setItem("isLogin", "true");
    };

    const handleLogout = () => {
        setIsLogin(false);
        localStorage.removeItem("isLogin");
        setProfileBox(false);
        navigate("/");
    };

    return (
        <div className="Home">
            <header className="Home-header">
                <div className="Home-title">
                    <button
                        className="Home-home-button"
                        type="button"
                        onClick={() => navigate("/")}
                    >
                        We go high
                    </button>

                    {isLogin ? (
                        <img
                            className="Home-profile-img"
                            src="/profile.png"
                            alt="프로필"
                            onClick={profileToggleBox}
                        />
                    ) : (
                        <>
                            <button
                                className="Home-login-button"
                                type="button"
                                onClick={() => navigate("/login")}
                            >
                                로그인
                            </button>
                            <button
                                className="Home-loginhome-button"
                                type="button"
                                onClick={handleLogin} // 임시용
                            >
                                로그인 홈 화면 가기
                            </button>
                        </>
                    )}
                </div>

                {isLogin && profileBox && (
                    <div className="Home-profileBox" id="myBox">
                        <button className="Home-profileBox-element" onClick={() => navigate("/mypage")}>내 정보</button>
                        <button className="Home-profileBox-element" onClick={() => {handleLogout(); navigate("/")}}>로그아웃</button>
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
