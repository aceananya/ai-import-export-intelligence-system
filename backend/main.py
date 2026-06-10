from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import Base, engine

# Models
from models.document import Document
from models.duty_rate import DutyRate
from models.hsn_duty_rate import HSNDutyRate
from models.client_history import ClientHistory
from models.shipment import Shipment
from models.analytics import Analytics

# Routes
from routes.document_routes import router as document_router
from routes.hsn_routes import router as hsn_router
from routes.duty_routes import router as duty_router
from routes.risk_routes import router as risk_router
from routes.shipment_routes import router as shipment_router
from routes.analytics_routes import router as analytics_router

# Create Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Import Export Intelligence System",
    description="Backend APIs for Import Export Automation",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(document_router)
app.include_router(hsn_router)
app.include_router(duty_router)
app.include_router(risk_router)
app.include_router(shipment_router)
app.include_router(analytics_router)

# Home API
@app.get("/")
def home():
    return {
        "message": "Backend Running Successfully",
        "status": "Active"
    }