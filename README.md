# TradeNexa 🚢
### AI-Powered Import–Export Intelligence System

**TradeNexa** is an academic group project by **Ananya, Ashna and Kajal**. It brings trade workflows into one interface, including document management, HSN classification, customs duty estimation, shipment tracking, orders, invoices and analytics.

> **Status:** Academic prototype. Some features use demonstration data. Outputs should not be treated as official customs or carrier information.

## Features

| Feature | Description | Status |
|---|---|---|
| Dashboard | Overview of trade operations | Frontend–backend integrated |
| Documents | Trade document management | Frontend–backend integrated |
| HSN Classification | Product classification workflow | Frontend–backend integrated |
| Duty Calculator | Customs duty estimation | Frontend–backend integrated |
| Shipment Tracking | Shipment details, route checkpoints and ETA | Backend-connected; also uses demo data |
| Analytics | Trade data visualisation | Frontend–backend integrated |
| Orders | Order management interface | **Demo-only** |
| Invoices | Invoice management interface | **Demo-only** |
| Settings | Company and interface preferences | Some preferences may be browser-local |

The application also includes landing, contact and login pages. Risk Assessment is not part of the current application.

## Technology Stack

- **Frontend:** React.js, Vite, Tailwind CSS, JavaScript
- **Backend:** Python, FastAPI
- **Persistence:** SQLAlchemy (verify the database engine in the deployed configuration)
- **Version control:** Git, GitHub

## Project Structure

```text
ai-import-export-intelligence-system/
├── frontend/
├── backend/
├── uploads/
└── README.md
```

## Run Locally

### Prerequisites
Install Node.js, npm and Python. Configure any required backend database credentials or environment variables locally. **Never commit secrets or `.env` files.**

### 1. Clone

```bash
git clone https://github.com/aceananya/ai-import-export-intelligence-system.git
cd ai-import-export-intelligence-system
```

### 2. Backend (Windows PowerShell)

From the repository root:

```powershell
py -m venv backend\venv
.\backend\venv\Scripts\python.exe -m pip install -r backend\requirements.txt
.\backend\venv\Scripts\python.exe -m uvicorn main:app --reload --app-dir backend
```

The local backend is typically available at `http://127.0.0.1:8000`, with interactive API docs at `http://127.0.0.1:8000/docs` if enabled.

### 3. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

**Note:** Check your frontend API base URL and backend environment configuration if requests fail. The instructions above should be verified from a fresh clone.

## Deployment

- **Backend (Render):** https://ai-import-export-intelligence-system.onrender.com
- **Frontend:** Add the frontend deployment URL if deployed; otherwise demonstrate locally.

The backend URL is not a complete hosted frontend demo.

## Testing

The team reported successful manual checks of nine selected modules: seven backend-integrated and two demo-only (Orders and Invoices). Shipment Tracking uses backend functionality alongside demonstration data. These checks do not establish production reliability, accuracy or security.

## Limitations and Future Scope

- Orders and Invoices currently use demonstration data.
- Shipment route checkpoints and ETAs may be illustrative, not verified live carrier events.
- HSN and duty outputs need verification against authoritative current sources.
- Future improvements: real carrier and weather integrations, stronger authentication, automated tests and production validation.

## Team

- **Ananya:** Project integration, frontend and backend integration, shipment tracking and dashboard
- **Ashna:** Frontend UI and responsive design
- **Kajal:** Backend development, database and API work

*Confirm these role descriptions with your team before submission.*

## Repository

https://github.com/aceananya/ai-import-export-intelligence-system

## Disclaimer

This project is for educational demonstration. Verify customs calculations, classifications and shipment details independently before real-world use.
