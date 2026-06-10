from fastapi import APIRouter
from database.database import SessionLocal
from models.client_history import ClientHistory

router = APIRouter()

@router.post("/risk")
def calculate_risk(
    client_name: str,
    country: str,
    late_payments: int,
    shipment_delays: int,
    compliance_issues: int
):

    db = SessionLocal()

    history = db.query(ClientHistory).filter(
        ClientHistory.client_name == client_name
    ).first()

    history_score = 0

    if history:
        history_score = (
            history.late_payments * 5 +
            history.shipment_delays * 7 +
            history.compliance_issues * 10
        )

    current_score = (
        late_payments * 10 +
        shipment_delays * 15 +
        compliance_issues * 20
    )

    score = current_score + history_score

    if score >= 80:
        level = "High Risk"
        recommendation = "Manual Review Required"

    elif score >= 40:
        level = "Medium Risk"
        recommendation = "Monitor Shipment"

    else:
        level = "Low Risk"
        recommendation = "Approved"

    if history:

        history.late_payments = late_payments
        history.shipment_delays = shipment_delays
        history.compliance_issues = compliance_issues

    else:

        new_client = ClientHistory(
            client_name=client_name,
            country=country,
            late_payments=late_payments,
            shipment_delays=shipment_delays,
            compliance_issues=compliance_issues
        )

        db.add(new_client)

    db.commit()
    db.close()

    return {
        "client_name": client_name,
        "country": country,
        "risk_score": score,
        "risk_level": level,
        "recommendation": recommendation
    }