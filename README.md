# Nexaid — AI-Powered Volunteer Coordination

> Connecting communities with volunteers using Google Gemini AI

[![Google Gemini](https://img.shields.io/badge/Powered%20by-Google%20Gemini-4285F4?style=flat&logo=google)](https://ai.google.dev/)
[![Firebase](https://img.shields.io/badge/Database-Firebase%20Firestore-FFA000?style=flat&logo=firebase)](https://firebase.google.com/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Built With AI](https://img.shields.io/badge/Google-Build%20With%20AI%202026-4285F4?style=flat&logo=google)](https://buildwithai.google.com/)

---

## What is Nexaid?

Nexaid is an AI-powered volunteer coordination platform built for NGOs and community organizations in India. It uses **Google Gemini AI** to intelligently parse unstructured community survey reports, extract urgent needs, and automatically match available volunteers based on skills and location.

### The Problem

Local NGOs collect community need data through messy paper surveys and WhatsApp messages. This data is scattered, impossible to prioritize manually, and never analyzed for patterns. Critical community needs go unmet for hours while coordinators sort through information.

### The Solution

Nexaid solves this with a **3-layer AI pipeline:**

```
Raw survey text
      ↓
Gemini AI extracts structured needs with urgency levels
      ↓
Gemini AI matches best volunteer by skills + location
      ↓
Pandas + Scikit-learn detects skill gaps + generates analytics
```

---

## Demo

### Live Demo Flow

1. NGO coordinator pastes this raw text:

```
"In Govandi area near the nala, around 40 families have no food
since 2 days. Some elderly people need BP and diabetes medicines
urgently. A child got hurt, needs first aid. Roads are waterlogged."
```

2. Gemini extracts **3 structured needs** with urgency badges
3. Dashboard shows Gemini's priority summary
4. One click → Gemini matches the right volunteer with reasoning

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Backend | Python FastAPI | REST API server |
| Database | Firebase Firestore | Real-time NoSQL database |
| Core AI | Google Gemini 2.0 Flash | Need extraction + volunteer matching |
| Analytics | Pandas + Scikit-learn + Matplotlib | Skill gap detection + charts |
| Frontend | HTML / CSS / Vanilla JS | 4-page web interface |
| UI Design | Google Stitch | AI-generated professional UI |
| IDE | Google Antigravity | AI-assisted development |
| Deployment | Railway + Firebase Hosting | Production hosting |

---

## Project Structure

```
Nexaid/
├── backend/
│   ├── main.py                    # FastAPI app entry point
│   ├── requirements.txt
│   ├── .env.example               # Environment variables template
│   ├── routers/
│   │   ├── needs.py               # /api/needs/* endpoints
│   │   ├── volunteers.py          # /api/volunteers/* endpoints
│   │   └── matches.py             # /api/matches/* endpoints
│   ├── services/
│   │   ├── firebase_service.py    # Firestore CRUD operations
│   │   └── gemini_service.py      # 3 Gemini AI prompts
│   └── analytics/
│       └── analyzer.py            # Pandas + Sklearn analytics
└── frontend/
    ├── index.html                 # Landing page
    ├── submit.html                # Report community need
    ├── dashboard.html             # Active needs dashboard
    └── volunteer.html             # Volunteer registration
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `POST` | `/api/needs/submit` | Submit raw survey text → Gemini extracts needs |
| `GET` | `/api/needs/active` | Get all active needs + Gemini dashboard summary |
| `POST` | `/api/volunteers/register` | Register a new volunteer |
| `GET` | `/api/volunteers` | Get all volunteers |
| `POST` | `/api/matches/{need_id}` | Gemini matches best volunteer to a need |
| `GET` | `/api/analytics` | Get charts + skill gap analysis |

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js (for frontend)
- Google account (for Gemini API key + Firebase)

### 1. Clone the Repository

```bash
git clone https://github.com/RameezHiro/Nexaid.git
cd Nexaid
```

### 2. Set Up Firebase

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project called `nexaid`
3. Enable Firestore Database in **test mode**, region `asia-south1`
4. Go to Project Settings → Service Accounts → Generate new private key
5. Download and rename it to `serviceAccountKey.json`
6. Place it in the `/backend` folder
7. Go to Project Settings → General → Your apps → Web app → copy `firebaseConfig`

### 3. Get Gemini API Key

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Click **Get API Key** → **Create API Key**
3. Copy the key

### 4. Configure Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```
GEMINI_API_KEY=your_gemini_api_key_here
FIREBASE_PROJECT_ID=nexaid
```

### 5. Install Backend Dependencies

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 6. Run the Backend

```bash
uvicorn main:app --reload
```

Server runs at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### 7. Run the Frontend

Simply open `frontend/index.html` in your browser.

Or serve it locally:
```bash
cd frontend
npx serve .
```

---

## Loading Demo Data

Make sure the server is running, then run these commands:

```powershell
# Register 5 demo volunteers
Invoke-RestMethod -Uri "http://localhost:8000/api/volunteers/register" -Method POST -ContentType "application/json" -Body '{"name": "Ravi Kumar", "skills": ["Medical", "First Aid"], "location": "Dharavi, Mumbai", "availability": true}'

Invoke-RestMethod -Uri "http://localhost:8000/api/volunteers/register" -Method POST -ContentType "application/json" -Body '{"name": "Priya Shah", "skills": ["Food Distribution", "Counseling"], "location": "Andheri, Mumbai", "availability": true}'

Invoke-RestMethod -Uri "http://localhost:8000/api/volunteers/register" -Method POST -ContentType "application/json" -Body '{"name": "Mohammed Ali", "skills": ["Transport", "Construction"], "location": "Kurla, Mumbai", "availability": true}'

Invoke-RestMethod -Uri "http://localhost:8000/api/volunteers/register" -Method POST -ContentType "application/json" -Body '{"name": "Sneha Patil", "skills": ["Education", "Counseling"], "location": "Bandra, Mumbai", "availability": true}'

Invoke-RestMethod -Uri "http://localhost:8000/api/volunteers/register" -Method POST -ContentType "application/json" -Body '{"name": "Arjun Nair", "skills": ["Technical", "Food Distribution"], "location": "Thane, Mumbai", "availability": true}'
```

---

## Environment Variables

| Variable | Description | Where to get |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key | [aistudio.google.com](https://aistudio.google.com) |
| `FIREBASE_PROJECT_ID` | Firebase project ID | Firebase Console → Project Settings |

> ⚠️ Never commit `.env` or `serviceAccountKey.json` to GitHub.

---

## Gemini AI Integration

Nexaid uses **3 distinct Gemini prompts:**

### Prompt 1 — Need Extraction
Takes raw messy survey text → returns structured JSON array of needs with urgency levels, categories, required skills, and estimated people affected.

### Prompt 2 — Volunteer Matching
Takes a community need + list of available volunteers → returns the best match with a confidence score and a 2-sentence human-readable reasoning.

### Prompt 3 — Dashboard Summary
Takes all active needs → returns a coordinator summary with critical count, recommended action, and most affected areas.

---

## Analytics Module

Built with Pandas + Scikit-learn:

- **Urgency Chart** — Seaborn bar chart of needs by urgency level
- **Category Breakdown** — Matplotlib pie chart of needs by category
- **Skill Gap Detection** — Uses `MultiLabelBinarizer` to compare skills needed vs skills available, returns gap list and coverage percentage

---

## Firestore Collections

### `needs`
```json
{
  "raw_text": "original survey text",
  "urgency": "critical | high | medium | low",
  "category": "food | medical | shelter | transport | education | other",
  "description": "Gemini-generated one-line description",
  "location": "area name",
  "skills_required": ["Medical", "First Aid"],
  "status": "active | matched",
  "created_at": "ISO timestamp"
}
```

### `volunteers`
```json
{
  "name": "full name",
  "skills": ["Medical", "First Aid"],
  "location": "area name",
  "availability": true,
  "created_at": "ISO timestamp"
}
```

### `matches`
```json
{
  "need_id": "firestore doc id",
  "volunteer_id": "firestore doc id",
  "match_reason": "Gemini's 2-sentence explanation",
  "confidence_score": 87,
  "urgency_flag": true,
  "created_at": "ISO timestamp"
}
```

---

## Deployment

### Backend — Railway

1. Create account at [railway.app](https://railway.app)
2. New Project → Deploy from GitHub → select `/backend`
3. Add environment variables: `GEMINI_API_KEY`, `FIREBASE_PROJECT_ID`
4. Add `serviceAccountKey.json` as a secret file
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Copy Railway URL → update `API_BASE` in all frontend HTML files

### Frontend — Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## Google Tools Used

| Tool | How Used |
|---|---|
| **Google Gemini 2.0 Flash** | Need extraction, volunteer matching, dashboard summary |
| **Firebase Firestore** | Real-time database for needs, volunteers, matches |
| **Firebase Hosting** | Frontend deployment |
| **Google Stitch** | AI-generated UI designs for all 4 pages |
| **Google Antigravity** | AI-assisted backend and frontend development |

---

## Team

| Name | Role |
|---|---|
| Shaikh Rameez | ML Engineer & Backend Lead |
| Person 3 | Data Analytics |
| Person 4 | Frontend Developer |

---

## Hackathon

**Google Build With AI 2026**
Problem Statement: PS5 — Smart Resource Allocation
Team: Algovoid

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with Google Gemini AI • Firebase • Google Stitch • Google Antigravity
  <br>
  Google Build With AI 2026 — Team Algovoid
</p>
