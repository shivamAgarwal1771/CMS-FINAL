@echo off
echo ========================================
echo Dynamic CMS - Setup Script
echo ========================================
echo.

echo Checking prerequisites...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 16+ from https://nodejs.org
    pause
    exit /b 1
)

echo ✓ Python and Node.js are installed
echo.

echo Setting up backend...
cd backend

REM Create virtual environment
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    copy env.example .env
    echo.
    echo ⚠️  IMPORTANT: Please edit backend\.env and add your OpenAI API key
    echo.
)

cd ..

echo.
echo Setting up frontend...
cd frontend

REM Install dependencies
echo Installing Node.js dependencies...
npm install

cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo 1. Edit backend\.env and add your OpenAI API key
echo 2. Run start-all.bat to start both servers
echo 3. Open http://localhost:3000 in your browser
echo.
echo Or run individually:
echo - start-backend.bat (backend only)
echo - start-frontend.bat (frontend only)
echo.
pause 