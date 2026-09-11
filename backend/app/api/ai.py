from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.services.ask_nexus import ask_nexus
from app.services.root_cause import analyse_root_cause
from app.services.contradiction import detect_contradictions
from app.services.future_simulator import simulate_future

router = APIRouter(prefix="/ai", tags=["AI"])

class AskRequest(BaseModel):
    question: str
    context: dict

class RootCauseRequest(BaseModel):
    problem: str
    metrics: dict

class ContradictionRequest(BaseModel):
    recommendations: list[dict]

class SimulatorRequest(BaseModel):
    decision: str
    current_state: dict


@router.post("/ask")
async def ask(req: AskRequest):
    answer = await ask_nexus(req.question, req.context)
    return {"answer": answer}

@router.post("/root-cause")
async def root_cause(req: RootCauseRequest):
    result = await analyse_root_cause(req.problem, req.metrics)
    return {"analysis": result}

@router.post("/contradictions")
async def contradictions(req: ContradictionRequest):
    result = await detect_contradictions(req.recommendations)
    return {"contradictions": result}

@router.post("/simulate")
async def simulate(req: SimulatorRequest):
    result = await simulate_future(req.decision, req.current_state)
    return {"simulation": result}