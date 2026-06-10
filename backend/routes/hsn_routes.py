from fastapi import APIRouter

router = APIRouter()

@router.post("/hsn")
def classify_product(product: str):

    product = product.lower()

    if "laptop" in product:
        return {
            "product": product,
            "hsn_code": "847130",
            "category": "Electronics"
        }

    elif "mobile" in product:
        return {
            "product": product,
            "hsn_code": "851713",
            "category": "Mobile Devices"
        }

    elif "shirt" in product or "cotton" in product:
        return {
            "product": product,
            "hsn_code": "610910",
            "category": "Textiles"
        }

    else:
        return {
            "product": product,
            "hsn_code": "000000",
            "category": "Unknown"
        }