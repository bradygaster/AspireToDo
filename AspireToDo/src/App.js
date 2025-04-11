import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      console.log("Fetching todos from API...");
      const todoItems = await fetch("/api/todos", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      console.log("API Response:", todoItems);

      if (!todoItems.ok) {
        throw new Error(`API returned ${todoItems.status}: ${todoItems.statusText}`);
      }

      const todoJson = await todoItems.json();
      console.log("Todo data:", todoJson);

      setTodos(todoJson);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aspire Todo</h1>
        <table>
          <thead>
            <tr>
              <th>Todo</th>
              <th>Is Complete?</th>
            </tr>
          </thead>
          <tbody>
            {(
              todos ?? [
                {
                  Id: "N/A",
                  Description: "",
                  IsComplete: false
                },
              ]
            ).map((t) => {
              return (
                <tr key={t.Id}>
                  <td>{t.Description}</td>
                  <td>{t.IsComplete}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
