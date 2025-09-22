// StockChart.js
import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";

// Chart.js 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CandlestickController,
    CandlestickElement
);

// Error Boundary
class ChartErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return <div>차트 렌더링 중 오류가 발생했습니다.</div>;
        }
        return this.props.children;
    }
}

function StockChart({ companyName }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/ai/stock-data/by-name?company_name=${encodeURIComponent(companyName)}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setChartData(data);
                else if (data.data && Array.isArray(data.data)) setChartData(data.data);
                else setChartData([]);
            })
            .catch(err => console.error("데이터 로딩 실패:", err));
    }, [companyName]);

    // Candlestick 데이터 변환 + NaN 체크
    const candlestickData = chartData.map(d => {
        const o = parseFloat(d.Open);
        const h = parseFloat(d.High);
        const l = parseFloat(d.Low);
        const c = parseFloat(d.Close);

        if ([o, h, l, c].some(v => isNaN(v))) return null;

        return {
            x: d.Date, // 문자열 날짜 사용 가능
            o,
            h,
            l,
            c,
            borderColor: c >= o ? "#FF0000" : "#0000FF",
            backgroundColor: c >= o ? "#FFAAAA" : "#AAAAFF"
        };
    }).filter(Boolean);

    // 데이터 없으면 로딩 메시지
    if (candlestickData.length === 0) {
        return <div>데이터 로딩 중...</div>;
    }

    const data = {
        datasets: [
            {
                label: `${companyName} 주가`,
                data: candlestickData
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: true, text: `${companyName} 캔들스틱 차트` }
        },
        scales: {
            x: {
                type: 'time',
                time: { unit: 'day' }
            },
            y: {
                beginAtZero: false
            }
        }
    };

    return (
        <div style={{ width: "1000px", height: "500px", marginTop: "30px" }}>
            <Chart
                key={candlestickData.length} // Canvas 재사용 방지
                type="candlestick"
                data={data}
                options={options}
            />
        </div>
    );
}

// Error Boundary 적용 후 내보내기
export default function StockChartWithBoundary(props) {
    return (
        <ChartErrorBoundary>
            <StockChart {...props} />
        </ChartErrorBoundary>
    );
}
