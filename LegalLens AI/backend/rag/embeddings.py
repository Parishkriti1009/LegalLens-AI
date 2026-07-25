from langchain_google_genai import GoogleGenerativeAIEmbeddings
from config import GEMINI_API_KEY


embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001",
    google_api_key=GEMINI_API_KEY
)


def create_vector_store(chunks):

    from langchain_community.vectorstores import FAISS

    vector_store = FAISS.from_documents(
        chunks,
        embeddings
    )

    return vector_store