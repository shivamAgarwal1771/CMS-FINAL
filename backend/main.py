from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Dict, Any, Optional
import json
import os
from pathlib import Path
import asyncio
from datetime import datetime
import uuid

from services.ai_service import AIService
from services.website_generator import WebsiteGenerator
from services.cache_service import CacheService

app = FastAPI(title="Dynamic CMS API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Initialize services
ai_service = AIService()
website_generator = WebsiteGenerator()
cache_service = CacheService()

class PromptRequest(BaseModel):
    prompt: str
    style_preference: Optional[str] = "modern"
    color_scheme: Optional[str] = "blue"
    layout_type: Optional[str] = "responsive"

class WebsiteResponse(BaseModel):
    website_id: str
    json_schema: Dict[str, Any]
    preview_url: str
    generated_at: str
    status: str

@app.post("/api/generate-website", response_model=WebsiteResponse)
async def generate_website(request: PromptRequest, background_tasks: BackgroundTasks):
    """Generate a website from a prompt"""
    try:
        # Generate unique ID for this website
        website_id = str(uuid.uuid4())
        
        # Check cache first
        cached_result = await cache_service.get_website(website_id)
        if cached_result:
            return cached_result
        
        # Generate JSON schema from prompt
        json_schema = await ai_service.generate_website_json(
            prompt=request.prompt,
            style_preference=request.style_preference,
            color_scheme=request.color_scheme,
            layout_type=request.layout_type
        )
        
        # Generate website components
        website_data = await website_generator.generate_website(json_schema, website_id)
        
        # Cache the result
        response = WebsiteResponse(
            website_id=website_id,
            json_schema=json_schema,
            preview_url=f"/preview/{website_id}",
            generated_at=datetime.now().isoformat(),
            status="completed"
        )
        
        await cache_service.cache_website(website_id, response)
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating website: {str(e)}")

@app.get("/api/website/{website_id}")
async def get_website(website_id: str):
    """Get a specific website by ID"""
    try:
        website = await cache_service.get_website(website_id)
        if not website:
            raise HTTPException(status_code=404, detail="Website not found")
        return website
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/preview/{website_id}")
async def preview_website(website_id: str):
    """Preview the generated website"""
    try:
        website_data = await website_generator.get_website_data(website_id)
        if not website_data:
            raise HTTPException(status_code=404, detail="Website not found")
        
        return website_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 