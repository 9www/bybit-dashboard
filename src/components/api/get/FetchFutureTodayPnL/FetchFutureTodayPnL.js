import { useEffect, useState } from "react";
import { API_KEY, API_SECRET } from "../../apiKey";

import axios from "axios";
import { getSignature } from "../../GetSignature";
import LineChart from "../../../Chart/LineChart";
import "./FetchFutureTodayPnL.scss";

function FetchFutureTodayPnL() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const chartTodayData = {
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
    };
    const ENDPOINT = "/private/linear/position/list";
    const TIMESTAMP = Date.now().toString();
    var newData = [];
    let index = 0;
    var params = {
        api_key: API_KEY,
        timestamp: TIMESTAMP,
    };
    params["sign"] = getSignature(params, API_SECRET);

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
                    console.log(newData);
                }
                if (i !== getTodayData.length - 1) {
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
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchData();

        const interval = setInterval(setIsLoading(true), 400);

        return () => {
            clearInterval(interval);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading === false) {
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
                    <LineChart chartData={chartTodayData} />
                </div>
            </div>
        );
    }
}

export default FetchFutureTodayPnL;
