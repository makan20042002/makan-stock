@echo off
chcp 65001 >nul
cd /d "%~dp0"
"%~dp0runtime\node.exe" "%~dp0src\launcher.mjs" --stop
if errorlevel 1 pause
