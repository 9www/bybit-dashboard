import FetchFutureWallet from "./components/api/get/FetchFutureWallet";
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
