import { useState } from "react";
import { Shield, FolderOpen, BarChart3, Plus } from "lucide-react";
import { useVault } from "../context/VaultContext";
import { useNavigate } from "react-router-dom";

const MainDashboard = () => {
  const { vaults } = useVault();
  const navigate = useNavigate();
  const [selectedVault, setSelectedVault] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-1">
          Main Dashboard
        </h1>
        <p className="text-gray-400 mb-6 text-sm">
        View, analyze, and manage all your secure vaults from one place
        </p>


        {/* Main Layout */}
        <div className="grid grid-cols-12 gap-6">

          {/* LEFT: Vault List */}
          <div className="col-span-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl h-[70vh] flex flex-col">

              {/* Vault List Header */}
              <div className="p-4 border-b border-white/10">
                <p className="text-white font-semibold">
                  Your Vaults ({vaults.length})
                </p>
              </div>

              {/* Scrollable Vault List */}
              <div
                className="flex-1 overflow-y-auto px-3 py-3
                           scrollbar-thin scrollbar-thumb-white/20
                           scrollbar-track-transparent"
              >
                {vaults.length === 0 ? (
                  <div className="text-center mt-10">
                    <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-300 text-sm">
                      No vaults created yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {vaults.map((vault) => (
                      <div
                        key={vault.id}
                        onClick={() => setSelectedVault(vault)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
                          ${
                            selectedVault?.id === vault.id
                              ? "bg-white/15 border border-purple-500"
                              : "hover:bg-white/10"
                          }`}
                      >
                        <Shield className="w-5 h-5 text-purple-400" />
                        <div className="flex-1">
                          <p className="text-white font-medium truncate">
                            {vault.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {vault.files?.length || 0} files •{" "}
                            {vault.storageUsed || 0} MB
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Vault Selector Button (ChatGPT-like) */}
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={() => navigate("/vaults")}
                  className="w-full flex items-center justify-center gap-2
                             bg-white/10 hover:bg-white/20
                             text-white py-2.5 rounded-xl font-semibold transition"
                >
                  <Plus className="w-5 h-5" />
                  Open Vault Selector
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Analytics Section */}
          <div className="col-span-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl h-[70vh] p-6">

              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Vault Analytics
              </h2>

              {!selectedVault ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400">
                    Select a vault from the left panel to view analytics
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-6">

                  {/* Files Stored */}
                  <div className="bg-black/20 rounded-xl p-6">
                    <p className="text-gray-400 text-sm mb-1">
                      Files Stored
                    </p>
                    <p className="text-4xl font-bold text-white">
                      {selectedVault.files?.length || 0}
                    </p>
                  </div>

                  {/* Storage Used */}
                  <div className="bg-black/20 rounded-xl p-6">
                    <p className="text-gray-400 text-sm mb-1">
                      Storage Used
                    </p>
                    <p className="text-4xl font-bold text-white">
                      {selectedVault.storageUsed || 0} MB
                    </p>
                  </div>

                  {/* Placeholder for future charts */}
                  <div className="col-span-2 bg-black/20 rounded-xl p-6">
                    <p className="text-gray-400 text-sm mb-2">
                      File Distribution (Upcoming)
                    </p>
                    <div className="h-32 flex items-center justify-center text-gray-500 text-sm">
                      Chart visualization will appear here
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
