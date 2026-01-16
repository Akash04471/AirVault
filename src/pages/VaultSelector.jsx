import { useVault } from "../context/VaultContext";
import { useNavigate } from "react-router-dom";

const VaultSelector = () => {
  const vaults = JSON.parse(localStorage.getItem("vaults")) || [];
  const { setActiveVault } = useVault();
  const navigate = useNavigate();

  const openVault = (vault) => {
    if (vault.hasPass) {
      const entered = prompt("Enter Vault Pass");
      if (entered !== vault.pass) return alert("Wrong Pass");
    }

    setActiveVault(vault);
    navigate("/vault/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-900 p-10">
      <h2 className="text-2xl text-white mb-6">Your Vaults</h2>

      <div className="grid grid-cols-3 gap-4">
        {vaults.map((v) => (
          <div
            key={v.id}
            onClick={() => openVault(v)}
            className="bg-slate-800 p-4 rounded-xl cursor-pointer hover:bg-slate-700"
          >
            <h3 className="text-white font-semibold">{v.name}</h3>
            <p className="text-slate-400 text-sm">
              {v.hasPass ? "🔒 Protected" : "No Pass"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VaultSelector;
