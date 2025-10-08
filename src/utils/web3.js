import { ethers } from "ethers";
import CertificateRegistryABI from "../contract/CertificateRegistryABI.json";

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

let provider;
let signer;
let contract;

export const initContract = async () => {
  if (!window.ethereum) {
    alert("MetaMask not detected!");
    return null;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, CertificateRegistryABI, signer);
  return contract;
};

export const getSignerAddress = async () => {
  if (!signer) return null;
  return signer.getAddress();
};

export const hashText = (text) => {
  return ethers.keccak256(ethers.toUtf8Bytes(text));
};
