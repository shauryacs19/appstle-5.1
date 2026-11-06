@echo off
cd /d "%~dp0"
echo Removing partial node_modules (was installed from Linux)...
if exist node_modules rmdir /s /q node_modules
echo Installing dependencies...
call npm install --no-audit --no-fund
if errorlevel 1 (echo. & echo INSTALL FAILED & pause & exit /b 1)
echo. & echo INSTALL OK > install.log
echo INSTALL OK - run: npm run dev
pause
