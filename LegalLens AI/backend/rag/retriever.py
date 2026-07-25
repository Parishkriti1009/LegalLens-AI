from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from config import GEMINI_API_KEY


embeddings = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001",
    google_api_key=GEMINI_API_KEY
)


def retrieve_context(vector_store, question):

    docs = vector_store.similarity_search(
        question,
        k=5
    )


    context = "\n\n".join(
        doc.page_content
        for doc in docs
    )


    return context