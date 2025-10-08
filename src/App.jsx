import { useState } from "react";
import { ethers } from "ethers";
import IssueCertificate from "./components/IssueCertificate";
import VerifyCertificate from "./components/VerifyCertificate";
import abi from "./contract/CertificateRegistry.json";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

export default function App() {
  const [account, setAccount] = useState(null);

  async function connectWallet() {
    if (!window.ethereum) return alert("Install MetaMask");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
        Academic Certificate DApp
      </h1>

      {!account ? (
        <div className="flex justify-center">
          <button
            onClick={connectWallet}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <>
          <p className="text-center text-green-400 mb-6">
            Connected: {account}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <IssueCertificate contractAddress={contractAddress} />
            <VerifyCertificate contractAddress={contractAddress} />
          </div>
        </>
      )}
    </div>
  );
}
