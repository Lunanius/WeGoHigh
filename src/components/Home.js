import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import '../css/Home.css';
import axios from "axios";


function Home() {
    const navigate = useNavigate();
    const [profileBox, setProfileBox] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [urlInput, setUrlInput] = useState("");
    const [id, setId] = useState("");
    const [posts,setPosts] = useState([]);

    const profileToggleBox = () => {
        setProfileBox(!profileBox);
    };

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
                return axios.get(`http://localhost:8080/api/userData/${user.username}`);
            })
            .then(response => {
                if (response) {
                    setId(response.data.username);
                }
            })
            .catch(err => {
                console.error("초기 유저 정보 불러오기 실패:", err);
                setUserInfo(null);
                // navigate("/") 는 로그인 실패 시만 이동하게끔 조절
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
    const getPostList = () => {
        axios.get("http://localhost:8080/api/posts", {
            params: {
                username: id
            }
        }).then(res => {
            setPosts(res.data);
        }).catch(err => {
            console.error("유저 정보 불러오기 실패:", err);
        })
    }
    useEffect(() => {
        if (id) {
            // id가 빈 값이 아닐 때 실행할 로직
            getPostList();
        }
    }, [id]);


    const isLogin = !!userInfo?.username;

    // 여기부터 추가함
    const [newsList, setNewsList] = useState([
        {
            title: '첫 번째 뉴스입니다',
            summary: '요약 내용입니다',
            image: 'news.png',
        },
        {
            title: '두 번째 뉴스입니다',
            summary: '다른 요약입니다',
            image: 'news.png',
        },
        {
            title: '세 번째 뉴스입니다',
            summary: '요약 내용입니다',
            image: 'news.png',
        },
        {
            title: '네 번째 뉴스입니다',
            summary: '다른 요약입니다',
            image: 'news.png',
        },
        {
            title: '다섯 번째 뉴스입니다',
            summary: '요약 내용입니다',
            image: 'news.png',
        },
        {
            title: '여섯 번째 뉴스입니다',
            summary: '다른 요약입니다',
            image: 'news.png',
        },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 5;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = newsList.slice(indexOfFirstNews, indexOfLastNews);
    const totalPages = Math.ceil(newsList.length / newsPerPage);

    useEffect(() => {
        const background = document.querySelector('.Home-img');
        if (background) {
            if (!isLogin) {
                background.style.height = '900px';
            } else {
                const baseHeight = 900;
                const extraPerNews = 220;

                const visibleNewsCount = currentNews.length;
                const height = visibleNewsCount === 0
                    ? baseHeight
                    : baseHeight + (visibleNewsCount - 1) * extraPerNews;

                background.style.height = `${height}px`;
            }
        }
    }, [currentNews.length, isLogin]);
    // 여기까지가 넣은거 아래에도 추가 코드 있음

    return (
        <div className="Home">
            <div className="Home-img"></div>
            <header className="Home-header">
                <div className="Home-home-container">
                    <div className="Home-title-container">
                        <button className="Home-home-button" type="button" onClick={() => navigate("/")}>
                            <img
                                className="Home-home-button-img"
                                src="/snake.png"
                                alt="타이틀 이미지"
                            />
                        </button>
                    </div>

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
                    <input id="Home-search-input" placeholder="뉴스 URL을 입력하세요." value={urlInput} onChange={(e) => setUrlInput(e.target.value)} />
                    <img
                        className="Home-search-img"
                        src="/icon.png"
                        alt="돋보기"
                        onClick={handleSearch}
                    />
                </div>

                 (
                    <>
                        <div className="Home-news-list">
                            {currentNews.map((news, idx) => (
                                <div className="Home-news-container" key={idx}>
                                    <div className="Home-news-img-container">
                                        <div className="Home-news-img">
                                            <img src={news.image} alt="news" />
                                        </div>
                                    </div>
                                    <div className="Home-news-detail-container">
                                        <div className="Home-news-title">{news.title}</div>
                                        <div className="Home-news-summary">{news.summary}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pagination">
                            {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={currentPage === index + 1 ? "active" : ""}
                            >
                                {index + 1}
                            </button>
                        ))}
                        </div>
                    </>
                )
            </header>
        </div>
    );
}

export default Home;
