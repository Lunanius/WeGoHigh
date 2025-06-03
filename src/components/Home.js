import { useState, useEffect, useCallback } from "react";
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
    const [msg,getmsg] = useState("");
    const postsPerPage = 5;
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rankings, setRankings] = useState([]);
    const [showList, setShowList] = useState(false);
    const [loading, setLoading] = useState(true);

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
                setId("");
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
    const getPostList = useCallback(() => {
        axios.get("http://localhost:8080/api/posts", {
            params: {
                page: currentPage - 1,
                size: postsPerPage,
                username: id,
                sort: 'id,DESC'
            }
        }).then(res => {
            // const sortedPosts = res.data.content.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPosts(res.data.content);
            setTotalPages(res.data.totalPages);
        }).catch(err => {
            if (err.response) {
                getmsg(err.response.data.message);
            } else {
                console.error("요청 실패:", err);
            }
        });
    }, [id, currentPage]);

    useEffect(() => {
        if (id) {
            // id가 빈 값이 아닐 때 실행할 로직
            getPostList();
        }
    }, [id,currentPage, getPostList]);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const isLogin = !!userInfo?.username;

    useEffect(() => {
        const background = document.querySelector('.Home-img');
        if (background) {
            if (!isLogin) {
                background.style.height = '900px';
            } else {
                const baseHeight = 850;
                const extraPerNews = 220;

                const currentNews = posts.slice(0, 5); // ✅ 최대 5개로 제한
                const visibleNewsCount = currentNews.length;

                const height = visibleNewsCount === 0
                    ? baseHeight
                    : baseHeight + (visibleNewsCount - 1) * extraPerNews;

                background.style.height = `${height}px`;
            }
        }
    }, [posts, isLogin]); // ✅ 의존성 배열도 수정 (currentNews → posts)

    /* gpt 실시간 검색어 */
    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const res = await axios.get("/api/rankings/top10");
                setRankings(res.data);
            } catch (err) {
                console.error("랭킹 불러오기 실패", err);
            } finally {
                setLoading(false); // 데이터 로딩 완료
            }
        };

        fetchRanking();
        const interval = setInterval(fetchRanking, 5000);
        return () => clearInterval(interval);
    }, []);
    /* gpt 실시간 검색어 */

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
                <div className="Home-search-container">
                    <div className="Home-Search">
                        <input id="Home-search-input" placeholder="뉴스 URL을 입력하세요." value={urlInput} onChange={(e) => setUrlInput(e.target.value)} />
                        <img
                            className="Home-search-img"
                            src="/icon.png"
                            alt="돋보기"
                            onClick={handleSearch}
                        />
                    </div>
                    {/*실시간 검색*/}
                    <div className="Home-real-time-search">
                        <div
                            className="top-company"
                            onClick={() => setShowList((prev) => !prev)}
                        >
                            🔥 실시간 1위: {rankings[0]?.company ?? "불러오는 중..."}
                        </div>
                        {showList && (
                            <ul className="ranking-list">
                                {rankings.map((item, index) => (
                                    <li key={index}>
                                        {index + 1}위: {item.company} ({item.count}회)
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {!isLogin ? (
                    <p className="Home-tail">
                        로그인해서 전에 검색했던 내용을<br />다시 확인하세요!
                    </p>
                ) : (
                    <>
                        {msg && (
                            <p className="Home-tail">{msg}</p>
                        )}

                        {!msg && (
                            <>
                                <div className="Home-news-list">
                                    {posts.map(post => (
                                        <div key={post.id} className="Home-news-container">
                                            <div className="Home-news-img-container">
                                                {post.thumbnailUrl ? (
                                                    <img className="Home-news-img" src={post.thumbnailUrl} alt="썸네일"/>
                                                ) : (
                                                    <img className="Home-news-img" src="/default-thumbnail.png" alt="기본 썸네일"/>
                                                )}
                                            </div>
                                            <div className="Home-news-detail-container">
                                                <h2 className="Home-news-title">
                                                    <Link to="/news" state={{ url: post.url, id: post.user.username }}>{post.title}</Link>
                                                </h2>
                                                <p className="Home-news-summary">
                                                    <Link to="/news" state={{ url: post.url, id: post.user.username }}>{post.content}</Link>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pagination">
                                    {pageNumbers.map((number) => (
                                        <button
                                            key={number}
                                            className={`page-btn ${number === currentPage ? 'active' : ''}`}
                                            onClick={() => handlePageChange(number)}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </header>
        </div>
    );
}

export default Home;