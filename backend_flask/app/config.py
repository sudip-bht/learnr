# app/config.py
import os

class Config:
    GOOGLE_API_KEY = "AIzaSyAs5gJfxv1TOEnnWxLSr3zDCMtlzWNySHE" # Ensure your API key is set in the environment
    UPLOAD_FOLDER=os.path.join(os.path.dirname(__file__),'../uploads')
    MONGO_URI = "mongodb+srv://sudeepbhattarai1792:d0ICAoLMDsmsgP5K@hackademia.anr9l.mongodb.net/learner?retryWrites=true&w=majority&appName=Hackademia" 
    JWT_SECRET_KEY = "TOKEN"