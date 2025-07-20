import json
import os
from pathlib import Path
from typing import Dict, Any, Optional
import asyncio
from jinja2 import Template
import aiofiles

class WebsiteGenerator:
    def __init__(self):
        self.websites_dir = Path("generated_websites")
        self.websites_dir.mkdir(exist_ok=True)
        self.component_templates = self._load_component_templates()
    
    def _load_component_templates(self) -> Dict[str, str]:
        """Load component templates for different component types"""
        return {
            "hero": self._get_hero_template(),
            "content": self._get_content_template(),
            "features": self._get_features_template(),
            "testimonials": self._get_testimonials_template(),
            "contact": self._get_contact_template(),
            "footer": self._get_footer_template(),
            "navbar": self._get_navbar_template()
        }
    
    async def generate_website(self, json_schema: Dict[str, Any], website_id: str) -> Dict[str, Any]:
        """Generate a complete website from JSON schema"""
        try:
            website_dir = self.websites_dir / website_id
            website_dir.mkdir(exist_ok=True)
            
            # Generate React components
            components = await self._generate_components(json_schema)
            
            # Generate main App component
            app_component = await self._generate_app_component(json_schema, components)
            
            # Generate index.html
            index_html = await self._generate_index_html(json_schema)
            
            # Generate package.json
            package_json = await self._generate_package_json()
            
            # Generate CSS styles
            css_styles = await self._generate_css_styles(json_schema)
            
            # Save all files
            await self._save_website_files(website_dir, {
                "components": components,
                "App.jsx": app_component,
                "index.html": index_html,
                "package.json": package_json,
                "styles.css": css_styles
            })
            
            return {
                "website_id": website_id,
                "preview_url": f"/preview/{website_id}",
                "files_generated": list(components.keys()) + ["App.jsx", "index.html", "package.json", "styles.css"]
            }
            
        except Exception as e:
            raise Exception(f"Error generating website: {str(e)}")
    
    async def _generate_components(self, json_schema: Dict[str, Any]) -> Dict[str, str]:
        """Generate React components from JSON schema"""
        components = {}
        
        for page in json_schema.get("pages", []):
            for section in page.get("sections", []):
                component_type = section.get("type", "content")
                component_id = section.get("id", f"{component_type}_{len(components)}")
                
                if component_type in self.component_templates:
                    component_code = await self._render_component(
                        component_type,
                        section,
                        json_schema.get("theme", {})
                    )
                    components[f"{component_id}.jsx"] = component_code
        
        return components
    
    async def _render_component(self, component_type: str, section_data: Dict[str, Any], theme: Dict[str, Any]) -> str:
        """Render a component using its template"""
        template = self.component_templates.get(component_type, self.component_templates["content"])
        
        # Prepare data for template
        content = section_data.get("content", {})
        styles = section_data.get("styles", {})
        
        # Merge theme styles
        theme_colors = theme.get("colors", {})
        theme_typography = theme.get("typography", {})
        
        # Apply theme to styles
        if "background" in styles and styles["background"].startswith("linear-gradient"):
            pass  # Keep gradient as is
        elif "background" in styles:
            styles["background"] = theme_colors.get("primary", styles["background"])
        
        if "text_color" not in styles:
            styles["text_color"] = theme_colors.get("secondary", "#333333")
        
        template_data = {
            "content": content,
            "styles": styles,
            "theme": theme,
            "component_id": section_data.get("id", "component")
        }
        
        return Template(template).render(**template_data)
    
    async def _generate_app_component(self, json_schema: Dict[str, Any], components: Dict[str, str]) -> str:
        """Generate the main App component"""
        app_template = """
import React from 'react';
import './styles.css';

{% for component_file in component_files %}
import {{ component_file.split('.')[0] }} from './{{ component_file }}';
{% endfor %}

function App() {
  return (
    <div className="app">
      {% for page in pages %}
        <div className="page" id="{{ page.id }}">
          {% for section in page.sections %}
            <{{ section.id.split('_')[0] }} />
          {% endfor %}
        </div>
      {% endfor %}
    </div>
  );
}

export default App;
"""
        
        component_files = list(components.keys())
        pages = json_schema.get("pages", [])
        
        return Template(app_template).render(
            component_files=component_files,
            pages=pages
        )
    
    async def _generate_index_html(self, json_schema: Dict[str, Any]) -> str:
        """Generate the index.html file"""
        metadata = json_schema.get("metadata", {})
        
        return f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{metadata.get('title', 'Generated Website')}</title>
    <meta name="description" content="{metadata.get('description', 'A dynamically generated website')}">
    <meta name="keywords" content="{', '.join(metadata.get('keywords', []))}">
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" src="App.jsx"></script>
    <script type="text/babel">
        ReactDOM.render(<App />, document.getElementById('root'));
    </script>
</body>
</html>
"""
    
    async def _generate_package_json(self) -> str:
        """Generate package.json for the website"""
        return """
{
  "name": "generated-website",
  "version": "1.0.0",
  "description": "A dynamically generated website",
  "main": "index.html",
  "scripts": {
    "start": "python -m http.server 3000",
    "build": "echo 'Website is ready to deploy'"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.22.0",
    "@babel/preset-react": "^7.22.0"
  }
}
"""
    
    async def _generate_css_styles(self, json_schema: Dict[str, Any]) -> str:
        """Generate CSS styles based on theme"""
        theme = json_schema.get("theme", {})
        colors = theme.get("colors", {})
        typography = theme.get("typography", {})
        spacing = theme.get("spacing", {})
        
        return f"""
/* Generated CSS Styles */
:root {{
    --primary-color: {colors.get('primary', '#667eea')};
    --secondary-color: {colors.get('secondary', '#764ba2')};
    --accent-color: {colors.get('accent', '#f093fb')};
    --text-color: #333333;
    --background-color: #ffffff;
}}

body {{
    font-family: {typography.get('font_family', 'Inter, sans-serif')};
    margin: 0;
    padding: 0;
    line-height: 1.6;
}}

.app {{
    min-height: 100vh;
}}

.page {{
    width: 100%;
}}

.container {{
    max-width: 1200px;
    margin: 0 auto;
    padding: {spacing.get('container_padding', '1rem')};
}}

.section {{
    padding: {spacing.get('section_padding', '4rem 0')};
}}

/* Responsive Design */
@media (max-width: 768px) {{
    .container {{
        padding: 1rem;
    }}
    
    .section {{
        padding: 2rem 0;
    }}
}}
"""
    
    async def _save_website_files(self, website_dir: Path, files: Dict[str, Any]):
        """Save all website files to the website directory"""
        for filename, content in files.items():
            if filename == "components":
                # Save individual component files
                for component_name, component_content in content.items():
                    component_path = website_dir / component_name
                    async with aiofiles.open(component_path, 'w', encoding='utf-8') as f:
                        await f.write(component_content)
            else:
                # Save other files
                file_path = website_dir / filename
                async with aiofiles.open(file_path, 'w', encoding='utf-8') as f:
                    await f.write(content)
    
    async def get_website_data(self, website_id: str) -> Optional[Dict[str, Any]]:
        """Get website data for preview"""
        website_dir = self.websites_dir / website_id
        if not website_dir.exists():
            return None
        
        try:
            # Read index.html for preview
            index_path = website_dir / "index.html"
            if index_path.exists():
                async with aiofiles.open(index_path, 'r', encoding='utf-8') as f:
                    html_content = await f.read()
                return {"html": html_content, "website_id": website_id}
        except Exception:
            return None
    
    # Component Templates
    def _get_hero_template(self) -> str:
        return """
const {{ component_id }} = () => {
  return (
    <section 
      className="hero-section {{ styles.padding }}"
      style={{
        background: "{{ styles.background }}",
        color: "{{ styles.text_color }}"
      }}
    >
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">{{ content.title }}</h1>
        <p className="text-xl mb-8">{{ content.subtitle }}</p>
        {% if content.cta_text %}
        <a 
          href="{{ content.cta_link }}" 
          className="bg-white text-{{ theme.colors.primary }} px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          {{ content.cta_text }}
        </a>
        {% endif %}
      </div>
    </section>
  );
};

export default {{ component_id }};
"""
    
    def _get_content_template(self) -> str:
        return """
const {{ component_id }} = () => {
  return (
    <section 
      className="content-section {{ styles.padding }}"
      style={{
        background: "{{ styles.background }}",
        color: "{{ styles.text_color }}"
      }}
    >
      <div className="container mx-auto">
        {% if content.title %}
        <h2 className="text-3xl font-semibold mb-6 text-center">{{ content.title }}</h2>
        {% endif %}
        <div className="prose max-w-none">
          {{ content.body }}
        </div>
      </div>
    </section>
  );
};

export default {{ component_id }};
"""
    
    def _get_features_template(self) -> str:
        return """
const {{ component_id }} = () => {
  return (
    <section 
      className="features-section {{ styles.padding }}"
      style={{
        background: "{{ styles.background }}",
        color: "{{ styles.text_color }}"
      }}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-12 text-center">{{ content.title }}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {% for feature in content.features %}
          <div className="text-center">
            <div className="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 className="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
          {% endfor %}
        </div>
      </div>
    </section>
  );
};

export default {{ component_id }};
"""
    
    def _get_testimonials_template(self) -> str:
        return """
const {{ component_id }} = () => {
  return (
    <section 
      className="testimonials-section {{ styles.padding }}"
      style={{
        background: "{{ styles.background }}",
        color: "{{ styles.text_color }}"
      }}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-12 text-center">{{ content.title }}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {% for testimonial in content.testimonials %}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">"{{ testimonial.quote }}"</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <p className="font-semibold">{{ testimonial.name }}</p>
                <p className="text-sm text-gray-600">{{ testimonial.position }}</p>
              </div>
            </div>
          </div>
          {% endfor %}
        </div>
      </div>
    </section>
  );
};

export default {{ component_id }};
"""
    
    def _get_contact_template(self) -> str:
        return """
const {{ component_id }} = () => {
  return (
    <section 
      className="contact-section {{ styles.padding }}"
      style={{
        background: "{{ styles.background }}",
        color: "{{ styles.text_color }}"
      }}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">{{ content.title }}</h2>
        <div className="max-w-md mx-auto">
          <form className="space-y-4">
            <div>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <textarea 
                placeholder="Your Message" 
                rows="4"
                className="w-full p-3 border rounded-lg"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-{{ theme.colors.primary }} text-white py-3 rounded-lg font-semibold hover:bg-opacity-90"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default {{ component_id }};
"""
    
    def _get_footer_template(self) -> str:
        return """
const {{ component_id }} = () => {
  return (
    <footer 
      className="footer-section {{ styles.padding }}"
      style={{
        background: "{{ styles.background }}",
        color: "{{ styles.text_color }}"
      }}
    >
      <div className="container mx-auto text-center">
        <p>&copy; 2024 {{ content.company_name or 'Your Company' }}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default {{ component_id }};
"""
    
    def _get_navbar_template(self) -> str:
        return """
const {{ component_id }} = () => {
  return (
    <nav 
      className="navbar-section {{ styles.padding }}"
      style={{
        background: "{{ styles.background }}",
        color: "{{ styles.text_color }}"
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">{{ content.brand_name or 'Brand' }}</div>
        <div className="hidden md:flex space-x-6">
          {% for link in content.links %}
          <a href="{{ link.url }}" className="hover:underline">{{ link.text }}</a>
          {% endfor %}
        </div>
      </div>
    </nav>
  );
};

export default {{ component_id }};
""" 