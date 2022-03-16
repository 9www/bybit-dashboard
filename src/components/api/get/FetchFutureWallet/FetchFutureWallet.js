import { useEffect, useState } from "react";
import { API_KEY, API_SECRET } from "../../apiKey";

import axios from "axios";
import { precisionRound } from "../../../Math/Math";
import { getSignature } from "../../GetSignature";
//package.json  "proxy": "https://api.bybit.com",
import "./FetchFutureWallet.scss";

function FetchFutureWallet() {
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
            //  console.log(res);
            setResponseData(res.data.result.USDT);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="wallet-container">
            <div className="data-container">
                <div className="data-type">Wallet Balance</div>
                <div className="data">
                    ${precisionRound(responseData.wallet_balance)}
                </div>
            </div>
            <div className="data-container">
                <div className="data-type">Current Wallet</div>
                <div className="data">
                    ${precisionRound(responseData.equity)}
                </div>
            </div>
            <div className="data-container">
                <div className="data-type">Unrealised PnL</div>
                <div className="data">
                    ${precisionRound(responseData.unrealised_pnl)}
                </div>
            </div>
            <div className="data-container">
                <div className="data-type">Realised PnL</div>
                <div className="data">
                    ${precisionRound(responseData.cum_realised_pnl)}
                </div>
            </div>
        </div>
    );
}

export default FetchFutureWallet;
