from app.core.llm import chat

SYSTEM = """You are the NEXUS Future Simulator — a company digital twin engine.
Given current business metrics and a proposed decision, simulate outcomes at
30, 60, and 90-day horizons. Include revenue impact, risk score (0-100),
and 2 alternative scenarios. Respond in structured JSON only."""

async def simulate_future(decision: str, current_state: dict) -> str:
    state_str = "\n".join(f"{k}: {v}" for k, v in current_state.items())
    user_msg = f"Proposed Decision: {decision}\n\nCurrent Company State:\n{state_str}"
    return await chat(SYSTEM, user_msg, temperature=0.2)