// src/components/StockChart.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend
);

const StockChart = ({ ticker }) => {
    const [stockData, setStockData] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!ticker) {
            setError(true);
            return;
        }

        fetch(`http://localhost:8000/stock-data/by-name?company_name=${ticker}`)
            .then((res) => {
                if (!res.ok) throw new Error("응답 오류");
                return res.json();
            })
            .then((data) => {
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error("데이터 없음");
                }
                setStockData(data);
                setError(false);
            })
            .catch((err) => {
                console.error("차트 데이터 불러오기 실패:", err);
                setError(true);
            });
    }, [ticker]);

    if (error) {
        return <p className="keyword-paragraph">차트를 불러올 수 없습니다.</p>;
    }

    const sortedData = [...stockData].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = {
        labels: sortedData.map((item) => item.date),
        datasets: [
            {
                label: "종가",
                data: sortedData.map((item) => item.close),
                fill: false,
                borderColor: "#4bc0c0",
                tension: 0.3,
                pointRadius: 3,
                pointBackgroundColor: "#4bc0c0",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true, position: "top" },
            title: { display: true, text: "최근 주가 흐름" },
        },
    };

    return (
        <div style={{ width: "950px", height: "100%" }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default StockChart;
