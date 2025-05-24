import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/News.css';
import axios from "axios";

function News() {
    const navigate = useNavigate();
    const [profileBox, setProfileBox] = useState(false); // 프로필 박스 토글
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/session-user", { withCredentials: true })
            .then(res => {
                setUserInfo(res.data);
            })
            .catch((err) => {
                setUserInfo(null);
            });
    }, []);

    const profileToggleBox = () => {
        setProfileBox(!profileBox);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        setProfileBox(false);
        navigate("/");
    };

    const isLogin = !!userInfo?.username;

    return (
        <div className="News">
            <div className="News-img"></div>
            <header className="News-header">
                <div className="News-home-container">
                    <button className="News-home-button" type="button" onClick={() => navigate("/")}>
                        <img
                            className="News-home-button-img"
                            src="/snake.png"
                            alt="타이틀 이미지"
                        />
                    </button>
                    <div className="News-button-container">
                        {isLogin ? (
                            <img
                                className="Home-profile-img"
                                src="/profile.png"
                                alt="프로필"
                                onClick={profileToggleBox}
                            />
                        ) : (
                            <button
                                className="News-login-button"
                                type="button"
                                onClick={() => navigate("/login")}
                            >
                                로그인
                            </button>
                        )}
                    </div>
                </div>

                {isLogin && profileBox && (
                    <div className="News-profileBox" id="myBox">
                        <button className="News-profileBox-element" onClick={() => navigate("/mypage")}>내 정보</button>
                        <button className="News-profileBox-element" onClick={handleLogout}>로그아웃</button>
                    </div>
                )}

                <div className="News-Search">
                    <input id="News-search-input" placeholder="뉴스 URL을 입력하세요." />
                    <img className="News-search-img" src="/icon.png" alt="돋보기" />
                </div>

                <div className="News-container">
                    <div className="News-container-news">
                        <div className="News-news-img">
                            <img className="News-newsimg" src="/news.png" alt="news" />
                        </div>
                        <div className="News-news">
                            <div className="News-news-title">
                                <p>기사 제목 최대 2줄로 표기 넘어가는 글자는 ...으로 표현했음 으아아아아아아아아아아아아아아아아아아아아</p>
                            </div>
                            <div className="News-news-detail">
                                <p>기사 내용은 최대 8줄로 표기함기사 내용은 최대 8줄로 표기함기사 내용은 최대 8줄로 표기함기사 내용은 최대 8줄로 표기함
                                    기사 내용은 최대 8줄로 표기함기사 내용은 최대 8줄로 표기함기사 내용은 최대 8줄로 표기함기사 내용은 최대 8줄로 표기함
                                    기사 내용은 최대 8줄로 표기함기사 내용은 최대 8줄로 표기함기사 내용은 최대 8줄로 표기함기사 내용은 최대 8줄로 표기함
                                    기사 내용은 최대 8줄로 표기함기사 내용은 최대 8줄로 표기함기사 내용은 최대 8줄로 표기함기사 내용은 최대 8줄로 표기함
                                    기사 내용은 최대 8줄로 표기함기사 내용은 최대 8줄로 표기함기사 내용은 최대 8줄로 표기함기사 내용은 최대 8줄로 표기함</p>
                            </div>
                            <div className="News-news-date">
                                <p>2021.08.08 서울경제</p>
                            </div>
                        </div>
                    </div>

                    <div className="News-container-summation">
                        <div className="News-summation-detail">
                            <p>해당 뉴스 키워드가 나오는 부분입니다 아래는 해당 기업의 주식 차트가 나옵니다.</p>
                        </div>
                        <div className="News-summation-chart">
                            <div className="News-summation-container-chart">
                                <img className="News-chart-img" src="/chart.png" alt="chart" />
                            </div>
                        </div>
                    </div>
                </div>
                {isLogin &&(
                    <div>
                        <p>로그인 했으면 보임 여기에 이제 로그인 했을 때 추가 기능 넣으면 됨 ㅇㅇ</p>
                    </div>
                )}

            </header>
        </div>
    );
}

export default News;
