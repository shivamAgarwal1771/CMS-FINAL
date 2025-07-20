@echo off
echo Starting Dynamic CMS - Full Stack...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && python -m venv venv && call venv\Scripts\activate && pip install -r requirements.txt && python main.py"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close all servers...
pause > nul

taskkill /f /im python.exe
taskkill /f /im node.exe 