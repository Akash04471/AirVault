import { useVault } from "../context/VaultContext";
import VaultTopBar from "../components/layout/VaultTopBar";
import AirVaultDashboard from "../components/dashboard/AirVaultDashboard";

const VaultDashboard = () => {
  const { activeVault } = useVault();

  if (!activeVault) {
    return <div className="text-white p-10">No vault selected</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <VaultTopBar username="John Doe" />
      <AirVaultDashboard hideSidebar />
    </div>
  );
};

export default VaultDashboard;
