import FetchFutureWallet from "./components/api/get/FetchFutureWallet/FetchFutureWallet";
import FetchFuturesPosition from "./components/api/get/FetchFuturePosition";
import "./App.scss";
function App() {
    return (
        <div>
            <FetchFutureWallet />
            <FetchFuturesPosition />
        </div>
    );
}

export default App;
