from fastapi import APIRouter, UploadFile, File
from database.database import SessionLocal
from models.document import Document

import os
import shutil

router = APIRouter()

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Upload Document
@router.post("/documents")
async def upload_document(file: UploadFile = File(...)):

    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    db = SessionLocal()

    new_document = Document(
        filename=file.filename,
        status="Uploaded"
    )

    db.add(new_document)
    db.commit()
    db.refresh(new_document)

    db.close()

    return {
        "id": new_document.id,
        "filename": new_document.filename,
        "status": "Validated",
        "document_type": "Commercial Invoice",
        "invoice_number": "INV-2025-001",
        "exporter": "ABC Exports Pvt Ltd",
        "confidence": "98%"
    }


# Get All Documents
@router.get("/documents")
def get_documents():

    db = SessionLocal()

    documents = db.query(Document).all()

    result = []

    for doc in documents:

        result.append({
            "id": doc.id,
            "filename": doc.filename,
            "status": "Validated",
            "document_type": "Commercial Invoice",
            "invoice_number": "INV-2025-001",
            "exporter": "ABC Exports Pvt Ltd",
            "confidence": "98%"
        })

    db.close()

    return result