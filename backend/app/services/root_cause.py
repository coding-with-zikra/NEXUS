from app.core.llm import chat

SYSTEM = """You are a Root Cause Analysis engine for enterprise operations.
Given an anomaly or business problem, identify the 3 most probable root causes,
their confidence level (%), contributing factors, and one corrective action each.
Respond in structured JSON only."""

async def analyse_root_cause(problem: str, metrics: dict) -> str:
    metrics_str = "\n".join(f"{k}: {v}" for k, v in metrics.items())
    user_msg = f"Problem: {problem}\n\nRelevant Metrics:\n{metrics_str}"
    return await chat(SYSTEM, user_msg, temperature=0.1)