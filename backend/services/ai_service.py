import openai
import json
import os
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

class AIService:
    def __init__(self):
        self.client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
    async def generate_website_json(
        self, 
        prompt: str, 
        style_preference: str = "modern",
        color_scheme: str = "blue",
        layout_type: str = "responsive"
    ) -> Dict[str, Any]:
        """
        Generate a structured JSON schema for website generation from a prompt
        """
        
        system_prompt = f"""
        You are an expert web developer and UI/UX designer. Your task is to convert user prompts into detailed JSON schemas for website generation.
        
        Generate a comprehensive JSON structure that includes:
        1. Page structure with sections
        2. Component specifications
        3. Styling and layout information
        4. Content organization
        5. Responsive design considerations
        
        Style preferences: {style_preference}
        Color scheme: {color_scheme}
        Layout type: {layout_type}
        
        Return ONLY valid JSON without any markdown formatting or explanations.
        """
        
        user_prompt = f"""
        Create a website based on this prompt: "{prompt}"
        
        The JSON should follow this structure:
        {{
            "metadata": {{
                "title": "Website Title",
                "description": "Website description",
                "keywords": ["keyword1", "keyword2"]
            }},
            "pages": [
                {{
                    "id": "home",
                    "name": "Home",
                    "sections": [
                        {{
                            "id": "hero",
                            "type": "hero",
                            "content": {{
                                "title": "Main heading",
                                "subtitle": "Subtitle text",
                                "cta_text": "Call to action",
                                "cta_link": "#"
                            }},
                            "styles": {{
                                "background": "gradient or color",
                                "text_color": "color",
                                "padding": "spacing"
                            }}
                        }}
                    ]
                }}
            ],
            "components": {{
                "hero": {{
                    "type": "hero",
                    "props": ["title", "subtitle", "cta_text", "cta_link"],
                    "styles": ["background", "text_color", "padding"]
                }}
            }},
            "theme": {{
                "colors": {{
                    "primary": "color",
                    "secondary": "color",
                    "accent": "color"
                }},
                "typography": {{
                    "font_family": "font",
                    "heading_sizes": {{}},
                    "body_size": "size"
                }},
                "spacing": {{
                    "container_padding": "value",
                    "section_padding": "value"
                }}
            }}
        }}
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,
                max_tokens=4000
            )
            
            # Extract JSON from response
            json_content = response.choices[0].message.content.strip()
            
            # Clean up the response to ensure it's valid JSON
            if json_content.startswith("```json"):
                json_content = json_content[7:]
            if json_content.endswith("```"):
                json_content = json_content[:-3]
            
            json_content = json_content.strip()
            
            # Parse and validate JSON
            website_schema = json.loads(json_content)
            
            # Add metadata
            website_schema["generated_from"] = prompt
            website_schema["style_preference"] = style_preference
            website_schema["color_scheme"] = color_scheme
            website_schema["layout_type"] = layout_type
            
            return website_schema
            
        except Exception as e:
            # Fallback to a default schema if AI generation fails
            return self._get_fallback_schema(prompt, style_preference, color_scheme, layout_type)
    
    def _get_fallback_schema(self, prompt: str, style_preference: str, color_scheme: str, layout_type: str) -> Dict[str, Any]:
        """Fallback schema when AI generation fails"""
        return {
            "metadata": {
                "title": f"Website for: {prompt[:50]}...",
                "description": f"A website generated from the prompt: {prompt}",
                "keywords": ["website", "generated", "dynamic"]
            },
            "pages": [
                {
                    "id": "home",
                    "name": "Home",
                    "sections": [
                        {
                            "id": "hero",
                            "type": "hero",
                            "content": {
                                "title": "Welcome to Our Website",
                                "subtitle": "Generated from your prompt",
                                "cta_text": "Get Started",
                                "cta_link": "#"
                            },
                            "styles": {
                                "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                "text_color": "#ffffff",
                                "padding": "py-20"
                            }
                        },
                        {
                            "id": "content",
                            "type": "content",
                            "content": {
                                "title": "About",
                                "body": f"This website was generated from your prompt: {prompt}"
                            },
                            "styles": {
                                "background": "#ffffff",
                                "text_color": "#333333",
                                "padding": "py-16"
                            }
                        }
                    ]
                }
            ],
            "components": {
                "hero": {
                    "type": "hero",
                    "props": ["title", "subtitle", "cta_text", "cta_link"],
                    "styles": ["background", "text_color", "padding"]
                },
                "content": {
                    "type": "content",
                    "props": ["title", "body"],
                    "styles": ["background", "text_color", "padding"]
                }
            },
            "theme": {
                "colors": {
                    "primary": "#667eea",
                    "secondary": "#764ba2",
                    "accent": "#f093fb"
                },
                "typography": {
                    "font_family": "Inter, sans-serif",
                    "heading_sizes": {
                        "h1": "text-4xl font-bold",
                        "h2": "text-3xl font-semibold",
                        "h3": "text-2xl font-medium"
                    },
                    "body_size": "text-lg"
                },
                "spacing": {
                    "container_padding": "px-4",
                    "section_padding": "py-16"
                }
            },
            "generated_from": prompt,
            "style_preference": style_preference,
            "color_scheme": color_scheme,
            "layout_type": layout_type
        } 