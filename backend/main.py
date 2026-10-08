from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import io
import os

app = FastAPI(
    title="FashionVision AI API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, "cnn_model.keras")

model = load_model(model_path)

class_names = [
    "T-shirt/top",
    "Trouser",
    "Pullover",
    "Dress",
    "Coat",
    "Sandal",
    "Shirt",
    "Sneaker",
    "Bag",
    "Ankle boot"
]

def preprocess_image(image):
    image = image.convert("L")
    image = ImageOps.invert(image)
    image = image.resize((28, 28))

    image_array = np.array(image).astype("float32") / 255.0
    image_array = image_array.reshape(1, 28, 28, 1)

    return image_array

@app.get("/")
def home():
    return {
        "message": "FashionVision API is running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()

    image = Image.open(io.BytesIO(contents))

    processed_image = preprocess_image(image)

    prediction = model.predict(
        processed_image,
        verbose=0
    )[0]

    predicted_index = int(np.argmax(prediction))
    confidence = float(prediction[predicted_index] * 100)

    top_indices = np.argsort(prediction)[-3:][::-1]

    top_predictions = []

    for index in top_indices:
        top_predictions.append({
            "class": class_names[index],
            "confidence": float(prediction[index] * 100)
        })

    return {
        "prediction": class_names[predicted_index],
        "confidence": confidence,
        "top_predictions": top_predictions
    }