import os
from dotenv import load_dotenv

load_dotenv()

DEPARTMENT_DATA = {
    "finance": {
        "verdict": "NO",
        "reason": "Cash balance dropped 12% this month. Only 2.1 months of runway at current burn rate. Increasing production would require ₹2.8 Cr additional working capital we don't have."
    },
    "production": {
        "verdict": "YES",
        "reason": "We have 30% spare capacity (current: 24,560 units, max: 35,000 units). Machines can handle the increase. Efficiency at 78% can improve with better scheduling."
    },
    "inventory": {
        "verdict": "NO",
        "reason": "Only 18 days of raw material stock remaining. Reorder point is 30 days. Supplier X has delayed 3 times this quarter, reducing our stockpile by 24%. Cannot support 30% production increase."
    },
    "sales": {
        "verdict": "YES",
        "reason": "Demand forecast shows 32,000 units needed next quarter. We are producing 24,560 — leaving 7,440 units of unmet demand. Market can absorb a 30% increase."
    }
}

AI_SUMMARIES = {
    "production": """The core contradiction is a classic capacity-vs-capital deadlock: Production and Sales both confirm the market opportunity is real (7,440 units of unmet demand, 30% spare machine capacity), but Finance and Inventory reveal the company cannot physically execute this decision today. The most dangerous conflict is Finance vs Inventory — with only 18 days of raw material stock and ₹1.8 Cr cash balance falling at 12% monthly, a production surge would trigger a stockout within 3 weeks while simultaneously draining working capital. Before proceeding, the CEO must resolve two blockers in sequence: first, secure a reliable raw material supply from an alternative to Supplier X, and second, arrange a working capital facility of at least ₹2.8 Cr to fund the expanded production cycle.""",
    "default": """A critical multi-department contradiction has been detected. Finance and Inventory are aligned against this decision due to cash constraints and supply chain risks, while Production and Sales support it based on capacity and demand data. The conflict between available market opportunity and operational readiness is the core tension. The CEO must address the supply chain and capital constraints before committing to this decision — proceeding without resolving these will likely result in a stockout and cash flow crisis within 6-8 weeks."""
}

def analyze_contradictions(decision: str) -> dict:
    conflicts = []

    if DEPARTMENT_DATA["finance"]["verdict"] != DEPARTMENT_DATA["production"]["verdict"]:
        conflicts.append({
            "dept_a": "Finance",
            "dept_b": "Production",
            "type": "Resource vs Capacity",
            "severity": "critical",
            "finance_says": DEPARTMENT_DATA["finance"]["reason"],
            "production_says": DEPARTMENT_DATA["production"]["reason"],
        })

    if DEPARTMENT_DATA["inventory"]["verdict"] != DEPARTMENT_DATA["sales"]["verdict"]:
        conflicts.append({
            "dept_a": "Inventory",
            "dept_b": "Sales",
            "type": "Supply vs Demand",
            "severity": "high",
            "inventory_says": DEPARTMENT_DATA["inventory"]["reason"],
            "sales_says": DEPARTMENT_DATA["sales"]["reason"],
        })

    if DEPARTMENT_DATA["finance"]["verdict"] != DEPARTMENT_DATA["sales"]["verdict"]:
        conflicts.append({
            "dept_a": "Finance",
            "dept_b": "Sales",
            "type": "Capital vs Opportunity",
            "severity": "high",
            "finance_says": DEPARTMENT_DATA["finance"]["reason"],
            "sales_says": DEPARTMENT_DATA["sales"]["reason"],
        })

    # Pick the right AI summary based on decision keyword
    if "production" in decision.lower() or "increase" in decision.lower():
        ai_summary = AI_SUMMARIES["production"]
    else:
        ai_summary = AI_SUMMARIES["default"]

    return {
        "decision": decision,
        "readiness_score": 61,
        "verdicts": {
            "finance": DEPARTMENT_DATA["finance"],
            "production": DEPARTMENT_DATA["production"],
            "inventory": DEPARTMENT_DATA["inventory"],
            "sales": DEPARTMENT_DATA["sales"],
        },
        "conflicts": conflicts,
        "conflict_count": len(conflicts),
        "ai_summary": ai_summary,
    }