from sqlalchemy import Column, Integer, String, Float, DateTime
from database.database import Base

class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(Integer, primary_key=True, index=True)

    tracking_number = Column(String)
    origin_country = Column(String)
    destination_country = Column(String)

    current_location = Column(String)

    status = Column(String)

    progress = Column(Integer)

    latitude = Column(Float)
    longitude = Column(Float)

    last_updated = Column(DateTime)