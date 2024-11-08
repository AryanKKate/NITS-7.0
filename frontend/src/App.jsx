import { BrowserRouter } from "react-router-dom";
import Landing from "./Pages/Landing";
import { WalletContractProvider } from "./Context/WalletProvider";

function App() {
  return (
    <WalletContractProvider>

    <BrowserRouter>
    <div>
      <Landing />
    </div>
    </BrowserRouter>
    </WalletContractProvider>
  );
}
export default App;
