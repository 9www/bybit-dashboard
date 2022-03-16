import { useEffect, useState } from "react";
import { API_KEY, API_SECRET } from "../apiKey";

import axios from "axios";
import { precisionRound } from "../../Math/Math";
import { getSignature } from "../GetSignature";
import BarChart from "../../Chart/BarChart";

function FetchFuturesPosition() {
    const [isLoaded, setIsLoaded] = useState(true);
    const [chartData, setChartData] = useState({});
    const ENDPOINT = "/private/linear/position/list";
    const TIMESTAMP = Date.now().toString();
    var params = {
        api_key: API_KEY,
        timestamp: TIMESTAMP,
    };
    params["sign"] = getSignature(params, API_SECRET);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios({
                    method: "get",
                    url: ENDPOINT,
                    params: params,
                });
                const getData = res.data.result
                    .filter(
                        (d) =>
                            d.data.size !== 0 ||
                            d.data.cum_realised_pnl !== 0 ||
                            d.data.unrealised_pnl !== 0
                    )
                    .map((d) => d.data);
                console.log(getData);

                setChartData({
                    labels: getData.map(
                        (d) =>
                            d.symbol.substring(0, d.symbol.length - 4) +
                            (d.side == "Buy" ? "-Long" : "-Short")
                    ),
                    datasets: [
                        {
                            label: "Realised PnL",
                            data: getData.map((d) => d.cum_realised_pnl),
                            backgroundColor: "rgba(61,111,170,0.3)",
                            borderColor: "rgba(61,111,170,1)",
                            borderWidth: 2,
                        },
                        {
                            label: "Unrealised PnL ",
                            data: getData.map((d) => d.unrealised_pnl),
                            backgroundColor: "rgba(220, 180, 50,0.3)",
                            borderColor: "rgba(220, 180, 50,1)",
                            borderWidth: 2,
                        },
                    ],
                });
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
        setInterval(() => {
            setIsLoaded(false);
        }, 400);
    }, []);

    if (isLoaded === true) {
        return <div></div>;
    } else {
        return (
            <div>
                <div style={{ width: 1000 }}>
                    <BarChart chartData={chartData} />
                </div>
            </div>
        );
    }
}

export default FetchFuturesPosition;
