from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from pydantic import BaseModel

app = FastAPI()

# CORS Middleware hinzufügen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Erlaubt alle Ursprünge, kann spezifisch angepasst werden
    allow_credentials=True,
    allow_methods=["*"],  # Erlaubt alle HTTP-Methoden
    allow_headers=["*"],  # Erlaubt alle Header
)

class DataRequest(BaseModel):
    ort: str
    zeitpunkt: int

@app.post("/api/daten")
async def daten(request: DataRequest):
    file_path = os.path.join(os.path.dirname(__file__), "..", "data", "meteodaten_2023_daily.json")
    try:
        ort = request.ort
        datum = request.zeitpunkt

        with open(file_path, "r") as file:
            data = json.load(file)

        gefiltert = [
            element for element in data
            if element.get("Standort") == ort and element.get("Datum") == datum
        ]

        if not gefiltert:
            return {"error": "Keine Daten gefunden für diesen Standort und dieses Datum"}

        result = gefiltert[0]
        return [
    result.get("RainDur", "N/A"),
    result.get("T", "N/A"),
    result.get("T_max_h1", "N/A"),
    result.get("p", "N/A")
]
    
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/verlauf")
async def verlauf(request: Request):
    try:
        # Parse the JSON body
        body = await request.json()
        ort = body.get("ort")
        parameter = body.get("parameter")

        if not ort or not parameter:
            return {"error": "Ort und Parameter müssen angegeben werden."}

        # Load data from JSON file
        file_path = os.path.join(os.path.dirname(__file__), "..", "data", "meteodaten_2023_daily.json")
        with open(file_path, "r") as f:
            data = json.load(f)

        # Filter data
        filtered_data = [
            {parameter: record.get(parameter), "Datum": record.get("Datum")}
            for record in data
            if record.get("Standort") == ort
        ]

        if not filtered_data:
            return {"error": f"Keine Daten gefunden für {ort} mit {parameter}"}

        return filtered_data
    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.0", port=8000)