import { useState } from "react";
import VaultPassModal from "../components/modals/VaultPassModal";
import { useNavigate } from "react-router-dom";

const CreateVault = () => {
  const [vaultName, setVaultName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!vaultName) return alert("Enter vault name");
    setShowModal(true);
  };

  const handleComplete = (hasPass, pass) => {
    const vault = {
      id: Date.now(),
      name: vaultName,
      hasPass,
      pass: hasPass ? pass : null
    };

    localStorage.setItem("vaults", JSON.stringify([
      ...(JSON.parse(localStorage.getItem("vaults")) || []),
      vault
    ]));

    navigate("/vaults");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-6 rounded-xl w-96">
        <h2 className="text-xl text-white font-bold mb-4">Create Vault</h2>

        <input
          value={vaultName}
          onChange={(e) => setVaultName(e.target.value)}
          placeholder="Vault Name"
          className="w-full p-3 rounded bg-slate-700 text-white mb-4"
        />

        <button
          onClick={handleCreate}
          className="w-full bg-blue-600 py-2 rounded text-white"
        >
          Create Vault
        </button>
      </div>

      {showModal && (
        <VaultPassModal
          onClose={() => handleComplete(false)}
          onSave={handleComplete}
        />
      )}
    </div>
  );
};

export default CreateVault;
