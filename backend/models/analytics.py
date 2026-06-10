from sqlalchemy import Column, Integer, String
from database.database import Base

class Analytics(Base):
    __tablename__ = "analytics_data"

    id = Column(Integer, primary_key=True, index=True)

    month = Column(String)
    shipments = Column(Integer)
    duties = Column(Integer)
    high_risk = Column(Integer)