import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import {
    Chart as ChartJS,
    LinearScale,
    TimeScale,
    CategoryScale,      // ✅ 추가
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";

ChartJS.register(
    CategoryScale,      // ✅ CategoryScale 등록
    LinearScale,
    TimeScale,
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
                console.log("✅ 서버 원본 데이터:", data);
                if (Array.isArray(data)) setChartData(data);
                else if (data.data && Array.isArray(data.data)) setChartData(data.data);
                else setChartData([]);
            })
            .catch(err => console.error("데이터 로딩 실패:", err));
    }, [companyName]);

    // Candlestick 데이터 변환
    const candlestickData = chartData.map(d => {
        const o = parseFloat(d.Open);
        const h = parseFloat(d.High);
        const l = parseFloat(d.Low);
        const c = parseFloat(d.Close);

        if ([o, h, l, c].some(v => isNaN(v))) return null;

        return {
            x: new Date(d.Date),
            o: o.toFixed(2),
            h: h.toFixed(2),
            l: l.toFixed(2),
            c: c.toFixed(2)
        };
    }).filter(Boolean);

    if (candlestickData.length === 0) {
        return <div>데이터 로딩 중...</div>;
    }

    const data = {
        datasets: [
            {
                label: `${companyName} 주가`,
                data: candlestickData,
                borderColor: candlestickData.map(d => d.c >= d.o ? "#FF0000" : "#0000FF"),
                backgroundColor: candlestickData.map(d => d.c >= d.o ? "#FFAAAA" : "#AAAAFF"),
                barPercentage: 0.005,
                categoryPercentage: 0.2
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true },
            title: { display: true, text: `${companyName} 캔들스틱 차트` }
        },
        scales: {
            x: {
                type: 'time',
                time: { unit: 'day', tooltipFormat: 'yyyy-MM-dd', stepSize: 1 },
                ticks: { maxRotation: 0, autoSkip: false }
            },
            y: { beginAtZero: false }
        }
    };

    // ✅ key를 사용해 차트 재생성
    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <div style={{ width: "950px", height: "500px" }}>
                <Chart
                    key={candlestickData.length} // 데이터 길이 바뀌면 차트 새로 렌더링
                    type="candlestick"
                    data={data}
                    options={options}
                />
            </div>
        </div>
    );
}

export default function StockChartWithBoundary(props) {
    return (
        <ChartErrorBoundary>
            <StockChart {...props} />
        </ChartErrorBoundary>
    );
}
