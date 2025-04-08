import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/News.css';

function News() {
    const navigate = useNavigate();

    return (
        <div className="News">
            <header className="News-header">
                <div className="News-title">
                    <button className="News-News-button" type="button" onClick={() => navigate("/")}>We go high</button>
                    <button className="News-login-button" type="button" onClick={() => navigate("/login")}>
                        로그인
                    </button>
                </div>
                <div className="News-Search">
                    <input id="News-search-input" placeholder="뉴스 URL을 입력하세요." />
                    <img className="News-search-img" src="/icon.png" alt="돋보기" />
                </div>
                <div className="News-container">
                    <div className="News-container-news">
                        <div className="News-news-img">
                            <img src="/news.png" alt="news" />
                        </div>
                        <div className="News-news">
                            <div className="News-news-title">
                                <p>손흥민 이대로 괜찮은가?</p>
                            </div>
                            <div className="News-news-detail">
                                <p>손흥민 토트넘 이대로 괜찮은가?</p>
                            </div>
                            <div className="News-news-date">
                                <p>2021.08.08 서울경제</p>
                            </div>
                        </div>
                    </div>
                    <div className="News-container-summation">
                        <div className="News-summation-detail">
                            <p>해당 뉴스 키워드로는 "손흥민, 토트넘, EPL"가 있으며, 주가가 ??로 예상</p>
                        </div>
                        <div className="News-summation-chart">
                            <img src="/chart.png" alt="chart" />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default News;
