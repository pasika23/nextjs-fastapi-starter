from fastapi import FastAPI, Request

app = FastAPI()

@app.middleware("http")
async def addcors(request: Request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

@app.get("/api/list")
def liste():
    return {"liste": ["Apfel", "Banane", "Birne", "Ananas", "Mango", "Orange"]}

@app.get("/api/add")
def addiere(a: int, b: int):
    return {"sum": a+b}