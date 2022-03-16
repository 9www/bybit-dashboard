import FetchFutureWallet from "./components/api/get/FetchFutureWallet/FetchFutureWallet";
import FetchFuturesPosition from "./components/api/get/FetchFuturePosition/FetchFuturePosition";
import "./App.scss";
function App() {
    return (
        <div>
            Bybit - DashBoard
            <FetchFutureWallet />
            <FetchFuturesPosition />
        </div>
    );
}

export default App;
