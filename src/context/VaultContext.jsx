import { createContext, useContext, useEffect, useState } from "react";

const VaultContext = createContext();

export const VaultProvider = ({ children }) => {
  const [vaults, setVaults] = useState([]);

  useEffect(() => {
  const storedVaults = JSON.parse(localStorage.getItem("vaults")) || [];

  const normalizedVaults = storedVaults.map(vault => ({
    ...vault,
    files: vault.files || [],
    storageUsed: vault.storageUsed || 0
  }));

  setVaults(normalizedVaults);
}, []);

  return (
    <VaultContext.Provider value={{ vaults, setVaults }}>
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = () => useContext(VaultContext);
