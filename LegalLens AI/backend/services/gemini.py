from langchain_google_genai import ChatGoogleGenerativeAI
from config import GEMINI_API_KEY


gemini = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=GEMINI_API_KEY,
    temperature=0.2
)