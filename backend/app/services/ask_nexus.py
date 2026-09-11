from app.core.llm import chat
import traceback

SYSTEM = """You are NEXUS Ω, an enterprise decision intelligence assistant.
You have access to company KPIs, financials, inventory, and sales data.
Answer concisely and always cite which department or metric your insight comes from.
Never hallucinate figures — if data is missing, say so."""

async def ask_nexus(question: str, context: dict) -> str:
    try:
        context_str = "\n".join(f"{k}: {v}" for k, v in context.items())
        user_msg = f"Company Context:\n{context_str}\n\nQuestion: {question}"
        result = await chat(SYSTEM, user_msg, temperature=0.2)
        print("SUCCESS:", result)
        return result
    except Exception as e:
        print("ERROR:", str(e))
        traceback.print_exc()
        raise