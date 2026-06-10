from sqlalchemy import Column, Integer, String
from database.database import Base

class ClientHistory(Base):
    __tablename__ = "client_history"

    id = Column(Integer, primary_key=True, index=True)

    client_name = Column(String)
    country = Column(String)

    late_payments = Column(Integer)
    pending_payments = Column(Integer)

    shipment_delays = Column(Integer)
    compliance_issues = Column(Integer)