# 🔐 AirVault – Secure Personal File Vault with Encrypted Storage & Smart Sharing

AirVault is a **privacy-first, personalized file vault** that provides **end-to-end encrypted storage**, **multi-layer authentication**, and **intelligent file sharing mechanisms**.  
It is designed as a secure alternative to conventional cloud storage platforms, giving users **full control and ownership of their data**.

---

## 📌 Project Overview

Modern cloud storage solutions offer convenience but often compromise on **privacy, transparency, and user control**.  
AirVault addresses these concerns by implementing a **zero-knowledge architecture**, ensuring that **only users can decrypt and access their files** — even the system administrators cannot view stored content.

The system supports:
- Encrypted file storage
- Secure, time-bound sharing
- Proximity-based file transfer
- Real-time access monitoring and alerts

---

## 🎯 Objectives

- Provide **end-to-end encrypted file storage** using AES-256 and RSA
- Ensure **zero-knowledge access** with layered authentication
- Enable **smart, controlled file sharing** with granular permissions
- Offer **real-time access logs and security alerts**
- Deliver a **user-friendly, responsive web interface**

---

## 🧠 Key Features

### 🔒 Security & Privacy
- Client-side AES-256 encryption
- RSA-based key wrapping
- Zero-knowledge architecture
- JWT-based authentication
- Two-Factor Authentication (2FA – TOTP)
- Vault-specific PIN protection

### 📁 File Management
- Secure upload & download
- Encrypted storage using MongoDB GridFS
- Large file support with chunked uploads
- Searchable vaults and folders

### 🔁 Smart Sharing
- Time-limited secure links
- QR-code based file sharing
- AirDrop-style proximity sharing
- View-only / download permissions
- Password-protected sharing
- Instant access revocation

### 📊 Monitoring & Alerts
- Detailed access logs
- Device & IP tracking
- Real-time anomaly alerts
- Failed login detection
- Download & share activity auditing

---

## 🛠️ Tech Stack

### Frontend
- React.js (v18+)
- TypeScript
- Tailwind CSS / Material UI
- Web Crypto API
- WebRTC (for proximity sharing)

### Backend
- Node.js
- Express.js
- JWT Authentication
- Socket.io (real-time alerts)
- Helmet, CORS, Rate Limiting

### Database & Storage
- MongoDB
- GridFS (encrypted file storage)
- Role-Based Access Control (RBAC)

### Security
- AES-256-GCM
- RSA-OAEP
- bcrypt (password hashing)
- OWASP Top 10 compliant APIs

---


