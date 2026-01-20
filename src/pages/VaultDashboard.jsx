import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVault } from "../context/VaultContext";
import VaultTopBar from "../components/layout/VaultTopBar";
import AirVaultDashboard from "../components/dashboard/AirVaultDashboard";

const VaultDashboard = () => {
  const { activeVault } = useVault();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeVault) {
      navigate("/dashboard"); // or "/vaults"
    }
  }, [activeVault, navigate]);

  if (!activeVault) return null;

  return (
    <div className="min-h-screen bg-slate-900">
      <VaultTopBar username="John Doe" />
      <AirVaultDashboard />
    </div>
  );
};

export default VaultDashboard;
