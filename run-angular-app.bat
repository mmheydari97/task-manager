@echo off
:: Set the title of the command prompt window
title Angular Task Manager

:: Change to the project directory
cd /d "C:\Users\heida\Documents\Projects\Angular Demo\task-manager"

:: Start the Angular development server in the background
start cmd /k "npm run start"

:: Wait a bit for the server to start
timeout /t 8 /nobreak > nul

:: Open the default browser to the Angular app URL
start http://localhost:4200/

:: Display a message
echo Angular Task Manager is now running!
echo.
echo To stop the application, close this window and the server window.
echo.
pause
