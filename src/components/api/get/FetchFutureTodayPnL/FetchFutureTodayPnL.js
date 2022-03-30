import { useEffect, useState } from "react";
import { API_KEY, API_SECRET } from "../../apiKey";

import axios from "axios";
import { precisionRound } from "../../../Math/Math";
import { getSignature } from "../../GetSignature";
import LineChart from "../../../Chart/LineChart";
import "./FetchFutureTodayPnL.scss";
function FetchFutureTodayPnL() {
    const [isLoaded, setIsLoaded] = useState(true);
    const [data, setData] = useState([]);
    const [chartTodayData, setChartTodayData] = useState({});
    const ENDPOINT = "/private/linear/position/list";
    const TIMESTAMP = Date.now().toString();
    var newData = [];
    let index = 0;
    var params = {
        api_key: API_KEY,
        timestamp: TIMESTAMP,
    };
    params["sign"] = getSignature(params, API_SECRET);
    useEffect(() => {
        setIsLoaded(true);
        async function fetchData() {
            try {
                const res = await axios({
                    method: "get",
                    url: ENDPOINT,
                    params: params,
                });

                const getTodayData = res.data.result
                    .filter((d) => d.data.realised_pnl !== 0)
                    .map((d) => d.data);
                console.log(getTodayData.map((d) => d.realised_pnl));

                for (let i = 0; i < getTodayData.length; i++) {
                    let sumPnL = 0;
                    let symbol = 0;
                    if (i === getTodayData.length - 1) {
                        setData(newData);
                        return;
                    }
                    if (
                        getTodayData[i]["symbol"] ===
                        getTodayData[i + 1]["symbol"]
                    ) {
                        symbol = getTodayData[i]["symbol"];
                        sumPnL =
                            getTodayData[i]["realised_pnl"] +
                            getTodayData[i + 1]["realised_pnl"];
                    } else {
                        symbol = getTodayData[i]["symbol"];
                        sumPnL = getTodayData[i]["realised_pnl"];
                    }
                    newData[index] = { symbol, sumPnL };
                    index++;
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();

        const timer = setInterval(() => {
            setIsLoaded(false);
        }, 400);
        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoaded === true) {
        return <div></div>;
    } else {
        return (
            <div className="future-today-pnl-container">
                <div className="bar-chart-container">
                    <div className="bar-chart-topic-container">
                        <div className="bar-chart-topic">
                            Today PnL (Included handling fees)
                        </div>
                    </div>
                    <LineChart
                        chartData={{
                            labels: data.map((d) => d.symbol),
                            datasets: [
                                {
                                    label: "Today PnL",
                                    data: data.map((d) => d.sumPnL),
                                    backgroundColor: "rgba(61,111,170,0.3)",
                                    borderColor: "rgba(61,111,170,1)",
                                    borderWidth: 2,
                                },
                            ],
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default FetchFutureTodayPnL;
