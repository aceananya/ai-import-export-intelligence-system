
from database.database import SessionLocal
from models.analytics import Analytics


def seed_analytics():
    db = SessionLocal()

    try:
        if db.query(Analytics).count() == 0:
            records = [
                Analytics(month="May", shipments=12, duties=45000, high_risk=2),
                Analytics(month="June", shipments=18, duties=62000, high_risk=3),
                Analytics(month="July", shipments=15, duties=51000, high_risk=1),
                Analytics(month="August", shipments=24, duties=78000, high_risk=4),
                Analytics(month="September", shipments=21, duties=69000, high_risk=2),
                Analytics(month="October", shipments=30, duties=95000, high_risk=5),
            ]

            db.add_all(records)
            db.commit()
            print("Sample analytics data added successfully.")
        else:
            print("Analytics data already exists.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_analytics()
