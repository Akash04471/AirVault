import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateVault from "./pages/CreateVault";
import VaultSelector from "./pages/VaultSelector";
import VaultDashboard from "./pages/VaultDashboard";
import { VaultProvider } from "./context/VaultContext";

function App() {
  return (
    <VaultProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateVault />} />
          <Route path="/vaults" element={<VaultSelector />} />
          <Route path="/vault/dashboard" element={<VaultDashboard />} />
        </Routes>
      </BrowserRouter>
    </VaultProvider>
  );
}

export default App;
