# app/config.py
import os

class Config:
    GOOGLE_API_KEY = "AIzaSyAe84XP3Zl3ErpQCV9YcuMfLUksxjRWKGg" # Ensure your API key is set in the environment
    UPLOAD_FOLDER=os.path.join(os.path.dirname(__file__),'../uploads')