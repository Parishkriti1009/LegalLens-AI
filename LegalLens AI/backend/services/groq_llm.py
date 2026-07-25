from langchain_groq import ChatGroq
from config import GROQ_API_KEY  # Make sure this matches config.py exactly

groq_llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    groq_api_key=GROQ_API_KEY,
    temperature=0.2
)