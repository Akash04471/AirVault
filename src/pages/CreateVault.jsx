import { useState } from "react";
import VaultPassModal from "../components/modals/VaultPassModal";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Sparkles } from "lucide-react";

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
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-lg shadow-purple-500/50">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-2">
            AirVault
          </h1>
          <p className="text-gray-400 text-sm">Create your secure vault</p>
        </div>

        {/* Card */}
        <div className="relative group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative space-y-6">
            <div>
              <h2 className="text-2xl text-white font-bold mb-2 flex items-center gap-2">
                Create Vault
                <Sparkles className="w-5 h-5 text-purple-400" />
              </h2>
              <p className="text-gray-400 text-sm">Your files will be encrypted end-to-end</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300 font-medium">Vault Name</label>
              <input
                value={vaultName}
                onChange={(e) => setVaultName(e.target.value)}
                placeholder="e.g., Personal Documents"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
              />
            </div>

            <button
              onClick={handleCreate}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-4 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Create Vault
            </button>

            <button
              onClick={() => navigate("/vaults")}
              className="w-full py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium"
            >
              View Existing Vaults
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          All data is encrypted locally before storage
        </p>
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