import { ethers } from "ethers";
import CertificateRegistryABI from "../contract/CertificateRegistryABI.json";

// Replace with your deployed contract address
export const CONTRACT_ADDRESS = "0x8990803c35102137f0e40d53309add6831e92655";

let provider;
let signer;
let contract;

/**
 * Initialize contract with signer
 */
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

/**
 * Get the current signer address
 */
export const getSignerAddress = async () => {
  if (!signer) return null;
  return signer.getAddress();
};

/**
 * Hash a plaintext string to bytes32
 */
export const hashText = (text) => {
  return ethers.keccak256(ethers.toUtf8Bytes(text));
};

/**
 * Validate Ethereum address
 */
export const isAddress = (value) => {
  return ethers.isAddress(value);
};
