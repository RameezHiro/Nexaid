from fastapi import APIRouter, HTTPException
from services.firebase_service import get_documents, add_document, update_document
from services.gemini_service import match_volunteer
from datetime import datetime

router = APIRouter()

@router.get("/suggest/{need_id}")
async def suggest_matches(need_id: str):
    # Fetch need
    all_needs = get_documents("needs")
    need = next((n for n in all_needs if n.get("id") == need_id), None)
    if not need:
        raise HTTPException(status_code=404, detail="Need not found")
        
    volunteers = get_documents("volunteers")
    if not volunteers:
        return {"suggestions": []}
        
    # Get top 3 from Gemini
    raw_suggestions = match_volunteer(need, volunteers)
    
    # Enrich with volunteer details
    enriched = []
    for sug in raw_suggestions:
        vol = next((v for v in volunteers if v.get("id") == sug.get("volunteer_id")), None)
        if vol:
            enriched.append({
                **sug,
                "volunteer_name": vol.get("name"),
                "volunteer_skills": vol.get("skills", []),
                "volunteer_location": vol.get("location")
            })
            
    return {"suggestions": enriched}

@router.post("/{need_id}")
async def create_match(need_id: str, volunteer_id: str):
    # This is now the 'confirm' endpoint
    volunteers = get_documents("volunteers")
    volunteer = next((v for v in volunteers if v.get("id") == volunteer_id), None)
    
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
        
    match_data = {
        "need_id": need_id,
        "volunteer_id": volunteer_id,
        "created_at": datetime.utcnow().isoformat(),
        "status": "confirmed"
    }
    
    add_document("matches", match_data)
    update_document("needs", need_id, {"status": "matched"})
    
    return {"status": "success", "match": match_data}
