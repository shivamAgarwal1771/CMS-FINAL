@echo off
echo Starting Dynamic CMS Frontend...
echo.

cd frontend

echo Installing dependencies...
npm install

echo Starting development server...
npm run dev

pause 