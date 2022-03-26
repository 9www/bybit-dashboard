import FetchFutureWallet from "./components/api/get/FetchFutureWallet/FetchFutureWallet";
import FetchFuturesPosition from "./components/api/get/FetchFuturePosition/FetchFuturePosition";
import FetchFutureTodayPnL from "./components/api/get/FetchFutureTodayPnL/FetchFutureTodayPnL";
import "./App.scss";
function App() {
    return (
        <div className="app-container">
            Bybit - DashBoard
            <div className="wallet-container">
                {" "}
                <FetchFutureWallet />
            </div>
            <div className="futures-container">
                <FetchFuturesPosition />
                <FetchFutureTodayPnL />
            </div>
        </div>
    );
}

export default App;
