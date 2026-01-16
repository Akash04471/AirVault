import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VaultTopBar = ({ username }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-slate-800 p-4">
      <h2 className="text-white font-bold">🔐 AirVault</h2>

      <div className="flex items-center gap-4">
        <div className="text-white">{username}</div>
        <button
          onClick={() => navigate("/vaults")}
          className="flex items-center gap-2 text-red-400"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default VaultTopBar;
