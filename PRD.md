# Nexaid: AI-Powered Crisis Coordination Platform

### 1. Executive Summary
Nexaid is a mission-critical coordination engine designed for high-stakes humanitarian response. It utilizes Google’s most advanced AI models (Gemini PRO) to transform fragmented community reports into a unified, geographic, and analytical command view.

### 2. Product Vision
To eliminate the "Information Latency" in crisis response by providing NGOs with an automated, AI-driven 3-layer pipeline that extracts needs, identifies responders, and visualizes impact in real-time.

---

### 3. Core Feature Specifications

#### 3.1. Identity & Secure Access (IAM)
- **Firebase Authentication**: Implemented a robust authentication layer for NGO coordinators.
- **Session Persistence**: Global `AuthContext` ensures secure, persistent sessions across the platform.
- **Protected Routing**: The "Coordinator Dashboard" and "Analytics" are locked behind an encrypted firewall, accessible only to verified personnel.

#### 3.2. Multimodal Crisis Intelligence (The 3-Layer Pipeline)
- **Layer 1: Extraction**: Gemini PRO parses raw, unstructured survey text into structured JSON (Urgency, Category, Skills, Population).
- **Layer 2: Match Discovery**: Gemini pairs "Live Needs" with available volunteers based on skill matrix and proximity reasoning.
- **Layer 3: Executive Summary**: Real-time generation of operational recommendations for NGO coordinators.

#### 3.3. Geographic Information Systems (GIS)
- **Interactive Crisis Map**: Leaflet-based GIS interface with custom dark-mode styling (CartoDB DarkMatter).
- **Dynamic Plotting**: Real-time visualization of emergency clusters based on extracted location data.
- **Situational Metadata**: Markers provide immediate "at-a-glance" insights into regional crisis density.

#### 3.4. Advanced Impact Analytics (The Analytics Module)
- **Lives Impacted Tracking**: Real-time calculation of total population reach using database aggregation.
- **Data Visualization (Recharts)**:
    - **Resource Demand (Pie)**: Percentage breakdown of crisis sectors.
    - **Urgency Intensity (Bar)**: Pressure heatmap of active operations.
    - **Coordination Velocity (Area)**: Visual tracking of response speed vs. resolution.
- **Skill Gap Detection (Legacy Core)**: Uses `MultiLabelBinarizer` to compare skills needed vs. available, identifying coverage percentages and recruitment priorities.

---

### 4. Technical Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, Recharts, Leaflet.
- **Backend**: FastAPI (Python), Uvicorn.
- **AI/ML Layer**: Google Gemini 2.0 Flash API (Need Extraction, Matching, Summarization).
- **Database**: Firebase Firestore (Real-time NoSQL).
- **Security**: Firebase SDK for Auth, CORS-hardened API communication (Explicit origins: `localhost:5173`, `127.0.0.1:5173`).

---

### 5. API Engineering Specs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/needs/submit` | Raw text → Gemini Extraction → Firestore Save |
| `GET` | `/api/needs/active` | Live needs retrieval + AI Priority Summary |
| `POST` | `/api/volunteers/register` | Identity & Skill Indexing |
| `POST` | `/api/matches/{need_id}` | Gemini Semantic Matching → Deployment Confirmation |

---

**Status**: ACTIVE
**Last Updated**: 2026-04-26
**Lead Architect**: Antigravity AI
