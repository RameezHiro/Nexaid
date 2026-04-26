# Nexaid — AI-Powered Crisis Coordination Platform 🌍🛡️

> **Mission Ready:** Transforming fragmented community reports into life-saving operational intelligence using Google Gemini AI.

[![Google Gemini](https://img.shields.io/badge/Powered%20by-Google%20Gemini-4285F4?style=flat&logo=google)](https://ai.google.dev/)
[![Firebase](https://img.shields.io/badge/Security-Firebase%20Auth-FFA000?style=flat&logo=firebase)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)

---

## 🚀 The Vision
Nexaid is a high-performance coordination engine built for NGOs and emergency responders. It eliminates "Information Latency" by using **Google Gemini PRO** to parse unstructured data, identify urgent needs, and visualize the crisis landscape in real-time.

### 🧠 The 3-Layer AI Pipeline
1.  **Intelligent Intake**: Transforms messy survey text/WhatsApp messages into structured GIS-ready data.
2.  **Semantic Matching**: Automatically pairs responders with emergencies based on skill-matrix and proximity.
3.  **Executive Analytics**: Generates real-time situational summaries for NGO leadership.

---

## ✨ Key Features

### 🔐 1. Secure Identity Management
Powered by **Firebase Authentication**, Nexaid ensures that sensitive crisis data and volunteer PII are protected behind a robust IAM firewall with persistent session management.

### 🗺️ 2. GIS Command Center
An interactive **Interactive Crisis Map** (Leaflet + CartoDB Dark) that plots emergency clusters as they happen. Coordinators can view regional crisis density and responder locations at a glance.

### 📊 3. Executive Impact Analytics
Real-time data visualization using **Recharts**.
- **Live Impact Counter**: Tracks total lives touched by current operations.
- **Resource Demand**: Visual breakdown of crisis sectors (Medical, Food, etc.).
- **Coordination Velocity**: Monitoring the speed of response vs. resolution.

### 🤖 4. Gemini Match Engine
Sophisticated volunteer-to-need matching. The AI doesn't just pick a person; it provides **Human-Readable Reasoning** for every match it makes.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Recharts, Leaflet |
| **Backend** | Python FastAPI, Uvicorn |
| **Database** | Firebase Firestore (NoSQL) |
| **AI Core** | Google Gemini 2.0 Flash / Pro |
| **Security** | Firebase Auth & Environment Variable Hardening |

---

## 📥 Getting Started

### 1. Prerequisites
- Node.js 18+ & Python 3.10+
- Google Gemini API Key
- Firebase Service Account Key

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/RameezHiro/Nexaid.git
cd Nexaid

# Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows (use `source venv/bin/activate` on Mac/Linux)
pip install -r requirements.txt
cp .env.example .env # Add your GEMINI_API_KEY

# Frontend Setup
cd ../frontend
npm install
cp .env.example .env # Add your Firebase Config
```

### 3. Run the Platform
**Terminal 1 (Backend):**
```bash
cd backend
uvicorn main:app --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

---

## 🛡️ Security Protocol
Nexaid follows industry-standard security practices:
- **Zero-Hardcode Policy**: All secrets are managed via `.env` files.
- **Git-Protection**: `.gitignore` is configured to block accidental leaks of API keys or Service Accounts.
- **CORS Hardening**: Explicit origin authorization for secure browser-to-server communication.

---

## 🌍 Impact
**Built for Google Build With AI 2026 — Team Algovoid**  
*Shaikh Rameez (Lead Architect)*

---
<p align="center">
  Built with ❤️ using Google Gemini AI • Firebase • Google Stitch
</p>
