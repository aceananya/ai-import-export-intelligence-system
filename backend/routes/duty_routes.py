from fastapi import APIRouter
from database.database import SessionLocal
from models.duty_rate import DutyRate
from models.hsn_duty_rate import HSNDutyRate

router = APIRouter()

@router.get("/countries")
def get_countries():

    db = SessionLocal()

    countries = db.query(DutyRate).all()

    result = []

    for country in countries:
        result.append(country.country)

    db.close()

    return result


@router.post("/duty")
def calculate_duty(
    country: str,
    hsn_code: str,
    value: float
):

    db = SessionLocal()

    country_rate = db.query(DutyRate).filter(
        DutyRate.country == country
    ).first()

    if not country_rate:
        return {
            "error": "Country not found"
        }

    hsn_rate = db.query(HSNDutyRate).filter(
        HSNDutyRate.hsn_code == hsn_code
    ).first()

    if not hsn_rate:
        return {
            "error": "HSN Code not found"
        }

    customs_duty = value * (
        hsn_rate.duty_rate / 100
    )

    vat = value * (
        country_rate.vat_rate / 100
    )

    surcharge = value * (
        country_rate.surcharge_rate / 100
    )

    total_duty = (
        customs_duty +
        vat +
        surcharge
    )

    db.close()

    return {
        "country": country,
        "hsn_code": hsn_code,
        "product_name": hsn_rate.product_name,
        "product_value": value,
        "customs_duty": customs_duty,
        "vat": vat,
        "surcharge": surcharge,
        "total_duty": total_duty
    }