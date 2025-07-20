# Dynamic CMS - AI-Powered Website Generator

A fast, modern CMS that generates complete websites from natural language prompts using AI. Built with Python FastAPI backend and React frontend.

## 🚀 Features

- **AI-Powered Generation**: Convert prompts to structured JSON schemas using OpenAI GPT-4
- **Fast Website Creation**: Generate complete React websites in seconds
- **Responsive Design**: All generated websites are mobile-first and responsive
- **Modern UI**: Beautiful, intuitive interface with Tailwind CSS
- **Caching System**: Redis-based caching for improved performance
- **Component Library**: Extensive collection of pre-built React components
- **Real-time Preview**: Live preview of generated websites
- **SEO Ready**: Built-in SEO optimization and meta tags

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Prompt   │───▶│   AI Service    │───▶│  JSON Schema    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │◀───│ Website Generator│◀───│  Component      │
│   (Frontend)    │    │   (Backend)     │    │   Templates     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Technology Stack

### Backend
- **Python FastAPI**: High-performance API framework
- **OpenAI GPT-4**: AI-powered prompt processing
- **Redis**: Caching system for performance
- **Jinja2**: Template engine for component generation
- **Pydantic**: Data validation and serialization

### Frontend
- **React 18**: Modern UI framework
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls

### Deployment
- **Vercel**: Frontend deployment
- **Railway/Render**: Backend deployment
- **Cloudflare**: CDN and edge caching

## 📦 Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- Redis (optional, falls back to memory cache)
- OpenAI API key

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CMS/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**
   ```bash
   cp env.example .env
   # Edit .env with your OpenAI API key and other settings
   ```

5. **Start the backend server**
   ```bash
   python main.py
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🚀 Usage

1. **Open the application** at `http://localhost:3000`

2. **Enter a prompt** describing your desired website:
   ```
   "Create a modern restaurant website with menu, contact form, and beautiful food photography"
   ```

3. **Configure options** (optional):
   - Style preference (modern, minimal, classic, etc.)
   - Color scheme (blue, green, purple, etc.)
   - Layout type (responsive, fixed, fluid)

4. **Generate website** - The AI will create a complete React website

5. **Preview and customize** - View the generated website and make adjustments

## 📁 Project Structure

```
CMS/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── services/
│   │   ├── ai_service.py       # OpenAI integration
│   │   ├── website_generator.py # Website generation logic
│   │   └── cache_service.py    # Redis/memory caching
│   ├── requirements.txt         # Python dependencies
│   └── env.example            # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/             # Page components
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── package.json           # Node.js dependencies
│   └── vite.config.js         # Vite configuration
└── README.md                  # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Redis Configuration (Optional)
REDIS_HOST=localhost
REDIS_PORT=6379

# Server Configuration
HOST=0.0.0.0
PORT=8000

# Development Configuration
DEBUG=True
ENVIRONMENT=development
```

### API Endpoints

- `POST /api/generate-website`: Generate website from prompt
- `GET /api/website/{website_id}`: Get website data
- `GET /preview/{website_id}`: Preview generated website
- `GET /api/health`: Health check

## 🎨 Customization

### Adding New Components

1. **Create component template** in `backend/services/website_generator.py`
2. **Add component type** to the component registry
3. **Update JSON schema** to include new component properties

### Styling Customization

- **Theme colors**: Modify `frontend/src/index.css`
- **Component styles**: Update Tailwind classes in templates
- **Responsive design**: Adjust breakpoints in `tailwind.config.js`

## 🚀 Deployment

### Backend Deployment

1. **Railway/Render** (Recommended)
   ```bash
   # Deploy to Railway
   railway login
   railway init
   railway up
   ```

2. **Docker** (Alternative)
   ```bash
   docker build -t dynamic-cms-backend .
   docker run -p 8000:8000 dynamic-cms-backend
   ```

### Frontend Deployment

1. **Vercel** (Recommended)
   ```bash
   npm run build
   vercel --prod
   ```

2. **Netlify** (Alternative)
   ```bash
   npm run build
   # Deploy dist/ folder to Netlify
   ```

## 🔍 Performance Optimization

- **Caching**: Redis caching for generated websites
- **Tree Shaking**: Vite removes unused code
- **Lazy Loading**: Components load on demand
- **CDN**: Static assets served via CDN
- **Compression**: Gzip compression for API responses

## 🛡️ Security

- **Input Validation**: Pydantic models validate all inputs
- **CORS Protection**: Configured CORS headers
- **Rate Limiting**: API rate limiting to prevent abuse
- **Sanitization**: HTML content sanitization
- **HTTPS**: Force HTTPS in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.dynamiccms.com](https://docs.dynamiccms.com)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discord**: [Join our community](https://discord.gg/dynamiccms)
- **Email**: support@dynamiccms.com

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Vercel for hosting
- Tailwind CSS for styling
- React team for the amazing framework
- FastAPI for the high-performance backend

---

**Made with ❤️ for developers who want to build faster** 