from app.core.llm import chat

SYSTEM = """You are the Decision Contradiction Engine for NEXUS Ω.
Given recommendations from multiple departments, identify conflicts, their severity
(low/medium/high/critical), which departments are affected, and a resolution strategy.
Respond in structured JSON only."""

async def detect_contradictions(recommendations: list[dict]) -> str:
    recs_str = "\n".join(
        f"[{r['department']}] {r['recommendation']}" for r in recommendations
    )
    user_msg = f"Department Recommendations:\n{recs_str}"
    return await chat(SYSTEM, user_msg, temperature=0.1)