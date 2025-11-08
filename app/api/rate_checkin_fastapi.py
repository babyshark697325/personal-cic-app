from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import requests

app = FastAPI()

SPACE_URL = "https://user6295018-checkin-quality-classifier.hf.space/api/predict"

@app.get("/")
def health():
    return {"message": "Bloom backend running"}

@app.post("/api/rate-checkin")
async def rate_checkin(request: Request):
    try:
        data = await request.json()
        text = data.get("text")

        if not text or not isinstance(text, str):
            return JSONResponse({"error": "No check-in text provided."}, status_code=400)

        try:
            response = requests.post(
                SPACE_URL,
                json={"text": text},
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            response.raise_for_status()
            result = response.json()
        except requests.RequestException as e:
            return JSONResponse({"error": f"Network error: {str(e)}"}, status_code=502)

        # Handle list responses
        if isinstance(result, list) and result:
            result = result[0]

        label = result.get("label") or result.get("result") or result.get("prediction")
        score = result.get("score")

        if not label:
            return JSONResponse({"error": "No label returned from model."}, status_code=500)

        # Optional label mapping for Bloom’s UI
        label_map = {
            "LABEL_0": "vague",
            "LABEL_1": "neutral",
            "LABEL_2": "descriptive"
        }
        label = label_map.get(label, label)

        return JSONResponse({"label": label, "score": score})

    except Exception as e:
        return JSONResponse({"error": f"Unexpected error: {str(e)}"}, status_code=500)