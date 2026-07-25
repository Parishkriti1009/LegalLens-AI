from services.gemini import gemini
from services.groq_llm import groq_llm

def legal_agent(context: str, question: str):
    try:
        # Call Gemini for summary/question answering
        summary_response = gemini.invoke(
            f"""You are a legal document assistant.
Analyze the following document:
{context}

Provide:
- Document summary
- Important clauses
- Answer user question

Question:
{question}"""
        )
        summary_text = summary_response.content if hasattr(summary_response, "content") else str(summary_response)
    except Exception as e:
        summary_text = f"Error generating summary: {str(e)}"

    try:
        # Call Groq for risk analysis
        risk_response = groq_llm.invoke(
            f"""You are a legal compliance expert.
Review this legal document:
{context}

Find:
- Legal risks
- Missing clauses
- Compliance issues
- Potential problems

Give a structured analysis."""
        )
        risk_text = risk_response.content if hasattr(risk_response, "content") else str(risk_response)
    except Exception as e:
        risk_text = f"Error generating risk analysis: {str(e)}"

    return {
        "summary": summary_text,
        "risk_analysis": risk_text
    }