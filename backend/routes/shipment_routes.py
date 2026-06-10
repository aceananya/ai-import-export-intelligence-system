from fastapi import APIRouter
from database.database import SessionLocal
from models.shipment import Shipment

router = APIRouter()


@router.get("/shipment/{tracking_number}")
def get_shipment(tracking_number: str):

    db = SessionLocal()

    shipment = db.query(Shipment).filter(
        Shipment.tracking_number == tracking_number
    ).first()

    db.close()

    if not shipment:
        return {
            "error": "Shipment not found"
        }

    return {
        "tracking_number": shipment.tracking_number,
        "origin_country": shipment.origin_country,
        "destination_country": shipment.destination_country,
        "current_location": shipment.current_location,
        "status": shipment.status,
        "progress": shipment.progress,
        "latitude": shipment.latitude,
        "longitude": shipment.longitude
    }