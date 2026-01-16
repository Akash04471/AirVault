import { useVault } from "../context/VaultContext";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, LockOpen, Plus, ArrowLeft } from "lucide-react";

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
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm">Back</span>
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                  <Shield className="w-8 h-8 text-purple-400" />
                </div>
                Your Vaults
              </h1>
              <p className="text-gray-400">Select a vault to access your encrypted files</p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              New Vault
            </button>
          </div>
        </div>

        {/* Vaults Grid */}
        {vaults.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
              <Shield className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No vaults yet</h3>
            <p className="text-gray-400 mb-6">Create your first vault to get started</p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Create Vault
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vaults.map((v) => (
              <div
                key={v.id}
                onClick={() => openVault(v)}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 cursor-pointer hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      {v.hasPass ? (
                        <Lock className="w-6 h-6 text-purple-400" />
                      ) : (
                        <LockOpen className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      v.hasPass 
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                        : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                    }`}>
                      {v.hasPass ? "Protected" : "No Password"}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2 truncate">
                    {v.name}
                  </h3>
                  
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Ready to open
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile Create Button */}
        <button
          onClick={() => navigate("/")}
          className="sm:hidden fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/50 hover:scale-110 transition-transform duration-300 z-50"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default VaultSelector;