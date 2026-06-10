from sqlalchemy import Column, Integer, String, Float
from database.database import Base

class HSNDutyRate(Base):
    __tablename__ = "hsn_duty_rates"

    id = Column(Integer, primary_key=True, index=True)
    hsn_code = Column(String)
    product_name = Column(String)
    duty_rate = Column(Float)