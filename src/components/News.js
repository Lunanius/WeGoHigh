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
    let id = location.state?.id;

    useEffect(() => {
        const background = document.querySelector('.News-img');
        const summaries = document.querySelectorAll('.summary-paragraph');

        if (background && summaries.length > 0) {
            let totalHeight = 0;
            summaries.forEach((el) => {
                totalHeight += el.offsetHeight;
            });

            const newHeight = 1700 + totalHeight + 200;
            background.style.height = `${newHeight}px`;
        }
    }, [newsData]); // 뉴스 데이터가 바뀔 때마다 재계산

    useEffect(() => {
        axios.get("http://localhost:8080/api/session-user", { withCredentials: true })
            .then(res => {
                const user = res.data;
                if (!user || !user.username) {
                    // 로그인 상태 아님
                    setUserInfo(null);
                    return;
                }
                setUserInfo(user);
            })
            .catch(err => {
                console.error("초기 유저 정보 불러오기 실패:", err);
                setUserInfo(null);
                // navigate("/") 는 로그인 실패 시만 이동하게끔 조절
            });
    }, []);
    useEffect(() => {
        if (!url) return;

        axios.post("http://localhost:8080/api/parse-news", {
            url,
            id: id || ""
        })
            .then((res) => {
                setNewsData(res.data);
            })
            .catch((err) => {
                console.error("뉴스 파싱 실패:", err);
                setNewsData(null);
            })
            .finally(() => setLoading(false));
    }, [url, id]);

    if (loading) return (
        <div className="News-loading-img">
            <img src="/loading.gif" alt="로딩 이미지" />
        </div>
    );

    if (!newsData) return <p>뉴스 정보를 가져오지 못했습니다.</p>;

    const profileToggleBox = () => {
        setProfileBox(!profileBox);
    };

    const handleLogout = () => {
        axios.post("http://localhost:8080/api/logout", {}, { withCredentials: true })
            .finally(() => {
                setUserInfo(null);
                id = "";
                setProfileBox(false);
                navigate("/");
            });
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

        navigate("/news", { state: { url: urlInput, id: id } });
    };

    const isLogin = !!userInfo?.username;

    const classifyScore = (score) => {
        if (score >= 0.7) {
            return "상";
        } else if (score >= 0.5) {
            return "중";
        } else {
            return "하";
        }
    };
    const keywordList = Array.isArray(newsData?.keyword) ? (
        newsData.keyword.map((item) => (
            <li className="keyword-paragraph" key={item.word}>
                {item.word} - {classifyScore(item.score)}
            </li>
        ))
    ) : (
        <li>키워드 없음</li>
    );

    const sentimentList = newsData?.sentiment ? (
        <li className="keyword-paragraph">{newsData.sentiment}</li>
    ) : (
        <li>감성 정보 없음</li>
    );

    const sentiment_value = newsData?.sentiment_value ? (
        <li className="keyword-paragraph">
            긍정: {newsData.sentiment_value.positive}, 부정: {newsData.sentiment_value.negative}
        </li>
    ) : (
        <li>긍부정 수치 정보 없음</li>
    );

    const splitSummary = (summary) => {
        if (!summary) return [];
        return summary
            // 소수점 처리
            .replace(/(\d)\.(?=\d)/g, '$1__DOT__')
            // 문장 부호(.?!) 기준으로 분리
            .split(/([.?!])/)
            .map(part => part.trim()) // 각 부분의 앞뒤 공백 제거
            .filter(part => part.length > 0) // 빈 문자열 제거
            .reduce((acc, curr) => {
                if (/[.?!]/.test(curr)) {
                    // 현재 요소가 문장 부호인 경우, 이전 요소와 합쳐서 완료된 문장으로 추가
                    if (acc.length > 0) {
                        acc[acc.length - 1] = `${acc[acc.length - 1]}${curr}`.replace(/\s+/g, ' ').replace(/\n+/g, '');
                    } else {
                        acc.push(curr);
                    }
                } else {
                    // 현재 요소가 텍스트인 경우, 이전 문장에 추가하거나 새로운 문장으로 시작
                    if (acc.length > 0 && !/[.?!]/.test(acc[acc.length - 1])) {
                        acc[acc.length - 1] = `${acc[acc.length - 1]} ${curr}`.replace(/\s+/g, ' ').replace(/\n+/g, '');
                    } else {
                        acc.push(curr.replace(/\s+/g, ' ').replace(/\n+/g, ''));
                    }
                }
                return acc;
            }, [])
            // 임시 소수점 복원
            .map(sentence => sentence.replace(/__DOT__/g, '.'))
            .filter(sentence => sentence.length > 0);
    };



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
                        <a href={newsData.url} target="_blank" rel="noopener noreferrer" className="news-link">
                            <div className="News-news-img">
                                {newsData.thumbnail_url ? (
                                    <img className="News-newsimg" src={newsData.thumbnail_url} alt="썸네일"/>
                                ) : (
                                    <img src="/default-thumbnail.png" alt="기본 썸네일"/>
                                )}
                            </div>
                        </a>
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
                            <p className="summary-title">해당 뉴스의 요약</p>
                            {newsData.summary && splitSummary(newsData.summary).map((sentence, index) => (
                                <p className="summary-paragraph" key={index}>{sentence}</p>
                            ))}
                            <p className="summary-title">해당 뉴스의 키워드<br />
                                <small style={{ color: '#888' }}>유사도 상 (0.9% ~ 0.7%) 중 (0.7% ~ 0.5%) 하 (0.5% ~)</small></p>
                            <il>{keywordList}</il>
                            <p className="summary-title">해당 뉴스의 관련된 회사</p>
                            <p className="keyword-paragraph">{newsData.company}</p>
                            
                            <p className="summary-title">해당 뉴스의 감성분석<br /></p>
                            <il>{sentimentList}</il>
                            <il>{sentiment_value}</il>

                        </div>
                        <div className="News-summation-chart">
                            <img src="/chart.png" alt="chart" />
                        </div>
                    </div>
                </div>
                {/*{isLogin &&(*/}
                {/*    <div>*/}
                {/*        <p>로그인 했으면 보임 여기에 이제 로그인 했을 때 추가 기능 넣으면 됨 ㅇㅇ</p>*/}
                {/*    </div>*/}
                {/*)}*/}

            </header>
        </div>
    );
}

export default News;
