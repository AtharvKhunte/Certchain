## 🧾 Blockchain-Based Certificate Verification System

### 🎯 Overview

A decentralized web application that enables **secure issuance and verification of certificates** using **Ethereum blockchain**.
This system ensures authenticity, transparency, and immutability of academic or professional certificates — removing the risk of fraud or tampering.

The project features two main roles:

* **Admin (Issuer)** – Uploads and issues certificates on-chain.
* **Public/Student** – Verifies certificates using a unique hash or uploaded file.

---

## 🏗️ Tech Stack

| Category             | Technologies Used                                             |
| -------------------- | ------------------------------------------------------------- |
| **Frontend**         | React.js, Tailwind CSS, Vite                                  |
| **Smart Contract**   | Solidity (Deployed via Remix / Hardhat)                       |
| **Web3 Integration** | ethers.js                                                     |
| **Wallet**           | MetaMask                                                      |
| **Hashing**          | SHA-256 for file & text hashing                               |
| **IPFS (Upcoming)**  | Pinata / web3.storage (for decentralized certificate storage) |

---

## 🚀 Features

### ✅ Implemented

* Blockchain-based certificate storage and verification
* Admin can issue and revoke certificates
* Student can check certificate authenticity using hash or uploaded file
* Hash-based integrity check (no fake certificates!)
* Clean React UI with Tailwind
* Error handling for invalid or revoked certificates

### 🧩 Upcoming Features

* **IPFS Integration** (in progress): Store and fetch actual certificate files
* **QR Code Verification** (planned): Generate verifiable QR codes for each certificate
* **Multi-Role Authentication** (future): Admin and Student login separation

---

## 🧠 System Architecture

```
+---------------------+
|   Admin (Issuer)    |
| Uploads & Issues     |
| Certificates (MetaURI)|
+----------+----------+
           |
           v
+---------------------+
|   Blockchain (SC)   |
| Stores hash & metaURI|
| Ensures immutability |
+----------+----------+
           |
           v
+---------------------+
|   Student / Public  |
| Verifies certificates|
| Using hash or file   |
+---------------------+
```

---

## ⚙️ Installation & Setup Guide

### 1️⃣ Clone the repository

```bash
git clone https://github.com/AtharvKhunte/Certchain.git
cd blockchain-certification-system
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the app

```bash
npm run dev
```

### 4️⃣ Deploy the Smart Contract

You can deploy your Solidity contract via **Remix IDE**:

1. Open [Remix](https://remix.ethereum.org)
2. Paste the contract code (`CertificateRegistry.sol`)
3. Compile and deploy using **Injected Provider (MetaMask)**
4. Copy the deployed **contract address**

### 5️⃣ Update Frontend Configuration

In `/src/utils/web3.js`, replace:

```js
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

with your actual deployed address.

---

## 🧱 Project Structure

```
📦 blockchain-certification-system
├── 📂 src
│   ├── 📂 components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   ├── 📂 pages
│   │   ├── AdminPanel.jsx
│   │   ├── StudentPanel.jsx
│   │   ├── VerifyCertificate.jsx
│   ├── 📂 utils
│   │   ├── web3.js
│   │   ├── hash.js
│   ├── App.jsx
│   ├── main.jsx
│
├── 📄 smart_contracts
│   └── CertificateRegistry.sol
│
├── 📄 README.md
├── 📄 package.json
└── 📄 vite.config.js
```

---

## 🔒 Smart Contract Summary

### `CertificateRegistry.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CertificateRegistry {
    address public admin;

    struct Certificate {
        address issuer;
        address student;
        bytes32 certHash;
        string metaURI;
        uint256 issuedAt;
        bool revoked;
    }

    mapping(bytes32 => Certificate) public certificates;

    event CertificateIssued(bytes32 indexed certHash, address indexed issuer, address indexed student, string metaURI, uint256 issuedAt);
    event CertificateRevoked(bytes32 indexed certHash, address indexed issuer, uint256 revokedAt);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function issueCertificate(address _student, bytes32 _certHash, string memory _metaURI) public onlyAdmin {
        require(certificates[_certHash].issuedAt == 0, "Certificate already issued");
        certificates[_certHash] = Certificate(msg.sender, _student, _certHash, _metaURI, block.timestamp, false);
        emit CertificateIssued(_certHash, msg.sender, _student, _metaURI, block.timestamp);
    }

    function revokeCertificate(bytes32 _certHash) public onlyAdmin {
        require(certificates[_certHash].issuedAt != 0, "Certificate not found");
        require(!certificates[_certHash].revoked, "Already revoked");
        certificates[_certHash].revoked = true;
        emit CertificateRevoked(_certHash, msg.sender, block.timestamp);
    }

    function getCertificate(bytes32 _certHash)
        public
        view
        returns (address issuer, address student, string memory metaURI, uint256 issuedAt, bool revoked)
    {
        Certificate memory c = certificates[_certHash];
        require(c.issuedAt != 0, "Certificate not found");
        return (c.issuer, c.student, c.metaURI, c.issuedAt, c.revoked);
    }

    function certificateExists(bytes32 _certHash) public view returns (bool) {
        return certificates[_certHash].issuedAt != 0;
    }
}
```

---

## 🧪 Development Workflow

### Committing Safely

```bash
git add .
git commit -m "Stable version before IPFS integration"
```

### Creating a Feature Branch

```bash
git checkout -b feature/ipfs-integration
```

### Pushing Your Work

```bash
git push -u origin feature/ipfs-integration
```

---

## 🗺️ Roadmap

| Feature                             | Status         |
| ----------------------------------- | -------------- |
| Certificate Issuance & Verification | ✅ Completed    |
| Revocation System                   | ✅ Completed    |
| Admin Dashboard                     | ✅ Completed    |
| Student Panel                       | ✅ Completed    |
| QR Code Verification                | 🔜 Planned     |
| IPFS Storage & Download             | ⚙️ In Progress |
| Multi-Role Login (Admin/Student)    | 🔜 Planned     |
| Full Deployment                     | 🔜 Planned     |

---

## 🧑‍💻 Contributing

Contributions are always welcome!
Please create a new branch for your feature/fix and submit a Pull Request.

```bash
git checkout -b feature/your-feature-name
git push origin feature/your-feature-name
```

---

## 📜 License

This project is licensed under the **MIT License**.
You’re free to use, modify, and distribute it with attribution.

---

## 💬 Author

**👨‍💻 Atharv Khunte**

📧 Contact: [[atharvkhunte@gmail.com](mailto:atharvkhunte@gmail.com)]
🌐 GitHub: [](https://github.com/AtharvKhunte)]((https://github.com/AtharvKhunte))




