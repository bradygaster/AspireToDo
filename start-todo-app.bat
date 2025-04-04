@echo off
echo Starting Todo Application...
echo.
echo [1/2] Starting API Server...
start cmd /k "cd AspireTodo.AppHost && dotnet run"
echo.
echo [2/2] Starting React Client...
start cmd /k "cd todoapp.client && npm start"
echo.
echo Both applications are starting. The React client will be available at http://localhost:3000