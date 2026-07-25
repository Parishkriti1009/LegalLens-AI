from fastapi import APIRouter, UploadFile, File, Form
import os
import time

from rag.loader import load_pdf
from rag.embeddings import create_vector_store
from rag.retriever import retrieve_context
from agent.legal_agent import legal_agent


router = APIRouter()

os.makedirs("uploads", exist_ok=True)


@router.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    question: str = Form(...)
        
):
    
    try:

        # Save PDF
        file_path = f"uploads/{file.filename}"

        content = await file.read()

        with open(file_path, "wb") as f:
            f.write(content)


        print("PDF saved")


        # RAG: Load PDF + Split
        chunks = load_pdf(file_path)

        print("Chunks created:", len(chunks))


        # Create Vector DB
        vector_store = create_vector_store(chunks)

        print("Vector store created")


        # Retrieve relevant context
        context = retrieve_context(
            vector_store,
            question
        )

        print("Context retrieved")


        # AI Agent
        result = legal_agent(
            context,
            question
        )

        print("Agent completed")


        return {
            "status": "success",
            "filename": file.filename,
            "question": question,
            "analysis": result
        }


    except Exception as e:

        print("ERROR:", e)

        return {
            "status": "failed",
            "error": str(e)
        }