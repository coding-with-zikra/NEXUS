from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel
from ai.contradiction_engine import analyze_contradictions
import os

load_dotenv()

app = FastAPI(
    title="NEXUS Ω API",
    description="AI-powered enterprise decision intelligence platform",
    version="1.0.0"
)

# CORS — allows Next.js frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "NEXUS Ω API is running"}

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "NEXUS Omega Backend",
        "version": "1.0.0"
    }

@app.get("/api/dashboard/kpis")
def get_kpis():
    return {
        "revenue": {"value": 12.6, "unit": "Cr", "change": 12, "up": True},
        "profit": {"value": 2.3, "unit": "Cr", "change": 8, "up": True},
        "production": {"value": 24560, "unit": "units", "change": -6, "up": False},
        "inventory": {"value": 3.4, "unit": "Cr", "change": 4, "up": True},
        "cash": {"value": 1.8, "unit": "Cr", "change": -12, "up": False},
        "receivables": {"value": 2.1, "unit": "Cr", "change": 15, "up": True},
    }

@app.get("/api/dashboard/health-score")
def get_health_score():
    return {
        "overall": 76,
        "financial": 72,
        "operational": 78,
        "customer": 81,
        "people": 74,
        "compliance": 79,
        "label": "Good"
    }

@app.get("/api/dashboard/alerts")
def get_alerts():
    return {
        "alerts": [
            {"msg": "Cash balance dropped 12% this month", "level": "high"},
            {"msg": "Supplier X delivery delayed 3 times", "level": "high"},
            {"msg": "Production efficiency below target", "level": "medium"},
            {"msg": "GST filing due in 12 days", "level": "medium"},
            {"msg": "New market opportunity in Tier-2 cities", "level": "low"},
        ]
    }

@app.get("/api/finance/pl")
def get_pl():
    return {
        "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "revenue": [9.2, 10.1, 11.3, 10.8, 11.9, 12.6],
        "expenses": [7.8, 8.2, 9.1, 8.9, 9.8, 10.3],
        "profit": [1.4, 1.9, 2.2, 1.9, 2.1, 2.3],
    }

@app.get("/api/finance/cashflow")
def get_cashflow():
    return {
        "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "inflow": [8.5, 9.2, 10.8, 9.9, 11.2, 12.1],
        "outflow": [7.2, 8.8, 9.5, 9.1, 10.5, 11.8],
    }

@app.get("/api/operations/production")
def get_production():
    return {
        "weeks": ["W1", "W2", "W3", "W4"],
        "output": [28000, 31000, 27000, 24560],
        "efficiency": [82, 85, 79, 78],
        "downtime": [3.1, 2.8, 4.5, 4.2],
        "wastage": [3.2, 2.9, 3.1, 2.8],
    }

@app.get("/api/sales/revenue")
def get_sales():
    return {
        "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "revenue": [8.1, 9.3, 10.2, 9.8, 11.1, 12.6],
        "target": [9.0, 9.5, 10.0, 10.5, 11.0, 11.5],
        "top_products": [
            {"name": "Product A", "revenue": 4.2, "growth": 18},
            {"name": "Product B", "revenue": 3.8, "growth": 12},
            {"name": "Product C", "revenue": 2.9, "growth": -5},
            {"name": "Product D", "revenue": 1.7, "growth": 22},
        ]
    }
class DecisionRequest(BaseModel):
    decision: str

@app.post("/api/contradictions/analyze")
def analyze_decision(request: DecisionRequest):
    result = analyze_contradictions(request.decision)
    return result

@app.get("/api/auth/lookup/{username}")
def lookup_username(username: str):
    from supabase import create_client
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_SECRET_KEY")
    sb = create_client(url, key)
    result = sb.table("profiles").select("id, role, email").eq("username", username.lower()).execute()
    if not result.data:
        return {"found": False}
    return {
        "found": True,
        "role": result.data[0]["role"],
        "email": result.data[0].get("email", "")
    }