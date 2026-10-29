
from database.database import SessionLocal
from models.duty_rate import DutyRate
from models.hsn_duty_rate import HSNDutyRate


def seed_duty_data():
    db = SessionLocal()

    try:
        # Add sample country rates only if the table is empty.
        if db.query(DutyRate).count() == 0:
            countries = [
                DutyRate(
                    country="India",
                    duty_rate=10.0,
                    vat_rate=18.0,
                    surcharge_rate=2.0,
                ),
                DutyRate(
                    country="United States",
                    duty_rate=10.0,
                    vat_rate=0.0,
                    surcharge_rate=0.0,
                ),
                DutyRate(
                    country="United Kingdom",
                    duty_rate=10.0,
                    vat_rate=20.0,
                    surcharge_rate=2.0,
                ),
                DutyRate(
                    country="United Arab Emirates",
                    duty_rate=5.0,
                    vat_rate=5.0,
                    surcharge_rate=0.0,
                ),
                DutyRate(
                    country="China",
                    duty_rate=10.0,
                    vat_rate=13.0,
                    surcharge_rate=0.0,
                ),
            ]

            db.add_all(countries)

        # Add sample HSN rates only if the table is empty.
        if db.query(HSNDutyRate).count() == 0:
            hsn_rates = [
                HSNDutyRate(
                    hsn_code="847130",
                    product_name="Laptop",
                    duty_rate=10.0,
                ),
                HSNDutyRate(
                    hsn_code="851713",
                    product_name="Smartphone",
                    duty_rate=10.0,
                ),
                HSNDutyRate(
                    hsn_code="847160",
                    product_name="Computer Keyboard",
                    duty_rate=5.0,
                ),
                HSNDutyRate(
                    hsn_code="854442",
                    product_name="Insulated Electric Cable",
                    duty_rate=5.0,
                ),
                HSNDutyRate(
                    hsn_code="610910",
                    product_name="Cotton T-Shirt",
                    duty_rate=12.0,
                ),
            ]

            db.add_all(hsn_rates)

        db.commit()
        print("Sample duty data added successfully.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_duty_data()
