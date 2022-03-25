import FetchFutureWallet from "./components/api/get/FetchFutureWallet/FetchFutureWallet";
import FetchFuturesPosition from "./components/api/get/FetchFuturePosition/FetchFuturePosition";
import FetchFutureTodayPnL from "./components/api/get/FetchFutureTodayPnL/FetchFutureTodayPnL";
import "./App.scss";
function App() {
    return (
        <div>
            Bybit - DashBoard
            <FetchFutureWallet />
            <FetchFuturesPosition />
            <FetchFutureTodayPnL />
        </div>
    );
}

export default App;
