import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateVault from "./pages/CreateVault";
import VaultSelector from "./pages/VaultSelector";
import VaultDashboard from "./pages/VaultDashboard";
import MainDashboard from "./pages/MainDashboard";
import { VaultProvider } from "./context/VaultContext";

function App() {
  return (
    <VaultProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateVault />} />
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/vaults" element={<VaultSelector />} />
          <Route path="/vault/dashboard" element={<VaultDashboard />} />
          <Route path="/dashboard" element={<MainDashboard />} /><Route path="/dashboard" element={<MainDashboard />} />
        </Routes>
      </BrowserRouter>
    </VaultProvider>
  );
}

export default App;
