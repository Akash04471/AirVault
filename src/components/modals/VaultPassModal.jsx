import { useState } from "react";

const VaultPassModal = ({ onSave, onClose }) => {
  const [pass, setPass] = useState("");

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-xl w-96">
        <h3 className="text-lg font-bold text-white mb-2">
          Add Master Vault Pass?
        </h3>

        <input
          type="password"
          placeholder="Vault Pass (optional)"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full p-3 rounded bg-slate-700 text-white mb-4"
        />

        <div className="flex gap-3">
          <button
            onClick={() => onSave(true, pass)}
            className="flex-1 bg-blue-600 py-2 rounded text-white"
          >
            Add Pass
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-slate-600 py-2 rounded text-white"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default VaultPassModal;
