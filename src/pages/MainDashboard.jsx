import { useState } from "react";
import {
  Shield,
  FolderOpen,
  BarChart3,
  Plus,
  Search,
  CheckCircle
} from "lucide-react";
import { useVault } from "../context/VaultContext";
import { useNavigate } from "react-router-dom";

const MAX_STORAGE = 1000;           // per-vault
const TOTAL_STORAGE_LIMIT = 5000;   // account-level

const MainDashboard = () => {
  const { vaults } = useVault();
  const navigate = useNavigate();

  const [selectedVault, setSelectedVault] = useState(null);
  const [search, setSearch] = useState("");

  /* ===============================
     CUMULATIVE ACCOUNT ANALYTICS
  =============================== */
  const totalVaults = vaults.length;

  const totalFiles = vaults.reduce(
    (sum, vault) => sum + (vault.files?.length || 0),
    0
  );

  const totalStorage = vaults.reduce(
    (sum, vault) => sum + (vault.storageUsed || 0),
    0
  );

  const fileTypeCounts = vaults.reduce(
    (acc, vault) => {
      (vault.files || []).forEach((file) => {
        const ext = file.name?.split(".").pop()?.toLowerCase();
        if (["pdf", "doc", "docx", "txt"].includes(ext)) acc.documents++;
        else if (["jpg", "jpeg", "png"].includes(ext)) acc.images++;
        else acc.others++;
      });
      return acc;
    },
    { documents: 0, images: 0, others: 0 }
  );

  const filteredVaults = vaults.filter((vault) =>
    vault.name.toLowerCase().includes(search.toLowerCase())
  );

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

        {/* ================= MAIN DASHBOARD ================= */}
        <div className="grid grid-cols-12 gap-6 mb-20">

          {/* LEFT: Vault List */}
          <div className="col-span-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl h-[70vh] flex flex-col">

              {/* Header + Search */}
              <div className="p-4 border-b border-white/10 space-y-3">
                <p className="text-white font-semibold">
                  Your Vaults ({filteredVaults.length})
                </p>

                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search vaults..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg
                               bg-white/10 text-white text-sm
                               placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Vault List */}
              <div className="flex-1 overflow-y-auto px-3 py-3
                              scrollbar-thin scrollbar-track-transparent
                              scrollbar-thumb-purple-700/40">
                {filteredVaults.length === 0 ? (
                  <div className="text-center mt-10">
                    <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-300 text-sm">
                      No matching vaults found
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredVaults.map((vault) => (
                      <div
                        key={vault.id}
                        onClick={() => setSelectedVault(vault)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
                          ${
                            selectedVault?.id === vault.id
                              ? "bg-white/15 border border-purple-500 shadow-lg"
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

                        {selectedVault?.id === vault.id && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Open Vault Selector */}
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

          {/* RIGHT: Selected Vault Analytics */}
          <div className="col-span-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl h-[70vh] p-6">

              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Vault Analytics
              </h2>

              {!selectedVault ? (
                <div className="h-full flex items-center justify-center text-gray-400">
                  Select a vault from the left panel to view analytics
                </div>
              ) : (
                <div className="space-y-6">

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-black/20 rounded-xl p-6">
                      <p className="text-gray-400 text-sm">Files Stored</p>
                      <p className="text-4xl font-bold text-white">
                        {selectedVault.files?.length || 0}
                      </p>
                    </div>

                    <div className="bg-black/20 rounded-xl p-6">
                      <p className="text-gray-400 text-sm">Storage Used</p>
                      <p className="text-4xl font-bold text-white">
                        {selectedVault.storageUsed || 0} MB
                      </p>
                    </div>
                  </div>

                  <div className="bg-black/20 rounded-xl p-6">
                    <p className="text-gray-400 text-sm mb-2">
                      Storage Utilization
                    </p>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                        style={{
                          width: `${Math.min(
                            (selectedVault.storageUsed / MAX_STORAGE) * 100,
                            100
                          )}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ================= ACCOUNT ANALYTICS ================= */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Account Analytics
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Cumulative storage and file insights across all vaults
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-gray-400 text-sm">Total Vaults</p>
              <p className="text-3xl font-bold text-white">{totalVaults}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-gray-400 text-sm">Total Files</p>
              <p className="text-3xl font-bold text-white">{totalFiles}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-gray-400 text-sm">Total Storage Used</p>
              <p className="text-3xl font-bold text-white">{totalStorage} MB</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
            <p className="text-gray-400 text-sm mb-3">
              Cumulative Storage Utilization
            </p>

            <div className="w-full bg-white/10 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                style={{
                  width: `${Math.min(
                    (totalStorage / TOTAL_STORAGE_LIMIT) * 100,
                    100
                  )}%`
                }}
              />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-6">
              File Type Distribution
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black/20 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-400">Documents</p>
                <p className="text-2xl font-bold text-white">
                  {fileTypeCounts.documents}
                </p>
              </div>

              <div className="bg-black/20 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-400">Images</p>
                <p className="text-2xl font-bold text-white">
                  {fileTypeCounts.images}
                </p>
              </div>

              <div className="bg-black/20 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-400">Others</p>
                <p className="text-2xl font-bold text-white">
                  {fileTypeCounts.others}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MainDashboard;
