from sqlalchemy import Column, Integer, String, Float
from database.database import Base

class DutyRate(Base):
    __tablename__ = "duty_rates"

    id = Column(Integer, primary_key=True, index=True)
    country = Column(String)
    duty_rate = Column(Float)
    vat_rate = Column(Float)
    surcharge_rate = Column(Float)