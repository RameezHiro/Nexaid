import os
import json
from dotenv import load_dotenv

# Load .env at the very top
load_dotenv()

import firebase_admin
from firebase_admin import credentials

from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

# Initialize Firebase before routers are imported
if not firebase_admin._apps:
    # 1. Try to use serviceAccountKey.json if it exists (Local Development)
    if os.path.exists("serviceAccountKey.json"):
        cred = credentials.Certificate("serviceAccountKey.json")
        firebase_admin.initialize_app(cred)
        
    # 2. Try loading from a stringified JSON env variable (e.g., Vercel)
    elif os.getenv("FIREBASE_SERVICE_ACCOUNT"):
        cred_dict = json.loads(os.getenv("FIREBASE_SERVICE_ACCOUNT"))
        cred = credentials.Certificate(cred_dict)
        firebase_admin.initialize_app(cred)
        
    # 3. Fallback to Application Default Credentials (e.g., GCP Cloud Run)
    else:
        firebase_admin.initialize_app()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers after Firebase initialization
from routers import needs, volunteers, matches

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://volunteerbridge-bb2b4.web.app",
        "https://volunteerbridge-bb2b4.firebaseapp.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(needs.router, prefix="/api/needs", tags=["needs"])
app.include_router(volunteers.router, prefix="/api/volunteers", tags=["volunteers"])
app.include_router(matches.router, prefix="/api/matches", tags=["matches"])


@app.get("/")
def home():
    return {"message": "Nexaid backend is running"}

    
@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "firebase": "connected",
        "gemini": "configured"
    }
