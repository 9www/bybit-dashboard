import { useEffect, useState } from "react";
import { API_KEY, API_SECRET } from "../../apiKey";

import axios from "axios";
import { precisionRound } from "../../../Math/Math";
import { getSignature } from "../../GetSignature";
//package.json  "proxy": "https://api.bybit.com",
import "./FetchFutureWallet.scss";

function FetchFutureWallet() {
    const [isLoading, setIsLoading] = useState(false);
    const [responseData, setResponseData] = useState([]);
    const ENDPOINT = "/v2/private/wallet/balance";
    const TIMESTAMP = Date.now().toString();
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
            setResponseData(res.data.result.USDT);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        fetchData();

        const interval = setInterval(setIsLoading(true), 400);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading === false) {
        return <div></div>;
    } else {
        return (
            <div className="wallet-container">
                <div className="data-container">
                    <div className="data-type-container">
                        <div className="data-type">Wallet Balance</div>
                    </div>
                    <div className="data-dollar-container">
                        <div className="data-dollar">
                            ${precisionRound(responseData.wallet_balance)}
                        </div>
                    </div>
                </div>

                <div className="data-container">
                    <div className="data-type-container">
                        <div className="data-type">Unrealised PnL</div>
                    </div>
                    <div className="data-dollar-container">
                        <div className="data-dollar">
                            ${precisionRound(responseData.unrealised_pnl)}
                        </div>
                    </div>
                </div>
                <div className="data-container">
                    <div className="data-type-container">
                        <div className="data-type">Realised PnL</div>
                    </div>
                    <div className="data-dollar-container">
                        <div className="data-dollar">
                            ${precisionRound(responseData.cum_realised_pnl)}
                        </div>
                    </div>
                </div>
                <div className="data-container">
                    <div className="data-type-container">
                        <div className="data-type">Today Profit</div>
                    </div>
                    <div className="data-dollar-container">
                        <div className="data-dollar">
                            ${precisionRound(responseData.realised_pnl)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FetchFutureWallet;
