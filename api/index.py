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

@app.post("/api/filter")
async def filter_data(request: Request):
    payload = await request.json()
    location = payload.get("location")
    metric = payload.get("metric")

    file_path = os.path.join(os.path.dirname(__file__), "..", "data", "meteodaten_2023_daily.json")

    try:
        # Lade die Daten
        with open(file_path, "r") as file:
            data = json.load(file)

        # Filtere die Daten nach Standort
        filtered_data = [entry for entry in data if entry["Standort"] == location]

        # Extrahiere nur das angeforderte Feld
        result = [
            {key: entry[key] for key in ["Datum", metric]} for entry in filtered_data
        ]


        return result
    except Exception as e:
        return {"error": str(e)}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)