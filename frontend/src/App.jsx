import { BrowserRouter } from "react-router-dom";
import Landing from "./Pages/Landing";
import { WalletContractProvider } from "./Context/WalletProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loan from "./Pages/Loan";

function App() {
  return (
    <WalletContractProvider>
      <div className="min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/loan" element={<Loan />} />
            {/*<Route path="/form" element={<Forms />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </WalletContractProvider>
  );
}
export default App;
