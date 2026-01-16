import React from "react";
import { useVault } from "../../context/VaultContext";

const AirVaultDashboard = () => {
  const { selectedVault } = useVault();

  if (!selectedVault) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>No Vault Selected</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{selectedVault.name}</h2>
      <p>Secure Vault Dashboard</p>

      {/* Future content */}
      <div style={{ marginTop: "1.5rem" }}>
        <p>📁 Files</p>
        <p>🔐 Encrypted Storage</p>
        <p>🔗 Secure Sharing</p>
      </div>
    </div>
  );
};

export default AirVaultDashboard;
