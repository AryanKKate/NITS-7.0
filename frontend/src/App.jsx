import Landing from "./Pages/Landing";
import { WalletContractProvider } from "./Context/WalletProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loan from "./Pages/Loan";
import BiddingPage from "./Pages/BiddingPage";

function App() {
  return (
    <WalletContractProvider>
      <div className="min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/loan" element={<Loan />} />
            <Route path="/bidding" element={<BiddingPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </WalletContractProvider>
  );
}
export default App;
