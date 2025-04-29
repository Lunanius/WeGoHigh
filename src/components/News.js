import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import '../css/News.css';
import axios from "axios";

function News() {
    const navigate = useNavigate();
    const location = useLocation();
    const [profileBox, setProfileBox] = useState(false); // 프로필 박스 토글
    const [urlInput, setUrlInput] = useState("");
    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);

    const url = location.state?.url;

    useEffect(() => {
        axios.get("http://localhost:8080/api/session-user", { withCredentials: true })
            .then(res => {
                setUserInfo(res.data);
            })
            .catch((err) => {
                setUserInfo(null);
            });
    }, []);

    useEffect(() => {
        if (!url) return;

        axios.post("http://localhost:8080/api/parse-news", { url })
            .then((res) => {
                setNewsData(res.data);
            })
            .catch((err) => {
                console.error("뉴스 파싱 실패:", err);
                setNewsData(null);
            })
            .finally(() => setLoading(false));
    }, [url]);

    if (loading) return <p>로딩 중...</p>;
    if (!newsData) return <p>뉴스 정보를 가져오지 못했습니다.</p>;

    const profileToggleBox = () => {
        setProfileBox(!profileBox);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        setProfileBox(false);
        navigate("/");
    };

    const handleSearch = () => {
        const trimmedUrl = urlInput.trim();

        if (!trimmedUrl) return alert("URL을 입력해주세요!");

        // 간단한 URL 패턴 검사 (http/https로 시작하고 .으로 끝나는 도메인 포함 여부)
        const urlPattern = /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/\S*)?$/i;
        if (!urlPattern.test(trimmedUrl)) {
            alert("올바른 URL 형식이 아닙니다!");
            return;
        }
        if (!trimmedUrl.includes("naver.com") && !trimmedUrl.includes("daum.net")) {
            alert("현재는 네이버와 다음 뉴스만 지원합니다!");
            return;
        }

        navigate("/news", { state: { url: urlInput } });
    };

    const isLogin = !!userInfo?.username;



    return (
        <div className="News">
            <header className="News-header">
                <div className="News-home-container">
                    <button className="News-home-button" type="button" onClick={() => navigate("/")}>
                        We go high
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
                    <input id="News-search-input" placeholder="뉴스 URL을 입력하세요." value={urlInput} onChange={(e) => setUrlInput(e.target.value)} />
                    <img
                        className="News-search-img"
                        src="/icon.png"
                        alt="돋보기"
                        onClick={handleSearch}
                    />
                </div>

                <div className="News-container">
                    <div className="News-container-news">
                        <div className="News-news-img">
                            {newsData.thumbnail_url ? (
                                <img className="News-newsimg" src={newsData.thumbnail_url} alt="썸네일" />
                            ) : (
                                <img src="/default-thumbnail.png" alt="기본 썸네일" />
                            )}
                        </div>
                        <div className="News-news">
                            <div className="News-news-title">
                                <p>{newsData.title}</p>
                            </div>
                            <div className="News-news-detail">
                                <p>{newsData.content}</p>
                            </div>
                            <div className="News-news-date">
                                <p>{newsData.time}</p>
                            </div>
                        </div>
                    </div>

                    <div className="News-container-summation">
                        <div className="News-summation-detail">
                            <p>해당 뉴스의 키워드는 {newsData.keyword}입니다 아래는 해당 기업의 주식 차트가 나옵니다.</p>
                        </div>
                        <div className="News-summation-chart">
                            <img src="/chart.png" alt="chart" />
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
