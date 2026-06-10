from fastapi import APIRouter
from database.database import SessionLocal
from models.analytics import Analytics

router = APIRouter()

@router.get("/analytics")
def get_analytics():

    db = SessionLocal()

    analytics = db.query(Analytics).all()

    result = []

    for item in analytics:

        result.append({
            "month": item.month,
            "shipments": item.shipments,
            "duties": item.duties,
            "high_risk": item.high_risk
        })

    db.close()

    return result