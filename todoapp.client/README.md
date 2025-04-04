# Todo React Client

This is a React frontend for the Todo API. It provides a user-friendly interface to manage your todo items.

## Features

- View all todo items in a clean, responsive UI
- Add new todo items
- Mark items as complete/incomplete
- Delete todo items
- Automatic sorting of items:
  - Incomplete items shown first, sorted newest to oldest
  - Completed items below, sorted by most recently completed first
- Visual indicators for completed vs incomplete items

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- .NET 9.0 SDK (for the backend API)

### Running the Application

#### Step 1: Start the Backend API

```bash
cd c:\src\TodoApp\TodoAPI
dotnet run
```

The API will start on https://localhost:7005.

#### Step 2: Start the React Client

```bash
cd c:\src\TodoApp\todoapp.client
npm install
npm start
```

The React app will start on http://localhost:3000.

## Technologies Used

- React
- TypeScript
- Bootstrap
- Axios
- React Icons

## Project Structure

- `src/components`: React components
- `src/models`: TypeScript interfaces
- `src/services`: API service for communicating with the backend
