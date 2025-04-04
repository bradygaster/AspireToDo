import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Todo } from '../models/Todo';
import { TodoService } from '../services/TodoService';
import NewTodoForm from './NewTodoForm';
import TodoItem from './TodoItem';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  // Fetch todos from the API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const fetchedTodos = await TodoService.getAllTodos();
      setTodos(fetchedTodos);
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new todo
  const handleAddTodo = async (description: string) => {
    try {
      const newTodo = await TodoService.createTodo({ 
        description, 
        isComplete: false 
      });
      setTodos(prevTodos => [...prevTodos, newTodo]);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error(err);
    }
  };

  // Toggle the completion status of a todo
  const handleToggleComplete = async (todo: Todo) => {
    try {
      await TodoService.toggleComplete(todo);
      fetchTodos(); // Refetch to get updated dateCompleted values
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error(err);
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id: number) => {
    try {
      await TodoService.deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error(err);
    }
  };

  // Sort todos: incomplete items by newest (assuming id is sequential), completed items by most recently completed
  const sortedTodos = () => {
    const incompleteTodos = todos
      .filter(todo => !todo.isComplete)
      .sort((a, b) => b.id - a.id); // Newest (highest ID) first
    
    const completedTodos = todos
      .filter(todo => todo.isComplete)
      .sort((a, b) => {
        if (!a.dateCompleted || !b.dateCompleted) return 0;
        return new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime();
      });
    
    return { incompleteTodos, completedTodos };
  };

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const { incompleteTodos, completedTodos } = sortedTodos();

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="m-0">Todo List</h1>
                <ThemeToggle />
              </div>
            </Card.Header>
            <Card.Body>
              {error && <div className="alert alert-danger">{error}</div>}
              
              <NewTodoForm onAddTodo={handleAddTodo} />
              
              {loading ? (
                <p className="text-center">Loading todos...</p>
              ) : (
                <>
                  {/* Incomplete Todos */}
                  <h2>Tasks To Do</h2>
                  {incompleteTodos.length === 0 ? (
                    <p className="text-muted">No pending tasks. Time to add a new one!</p>
                  ) : (
                    incompleteTodos.map(todo => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggleComplete={handleToggleComplete}
                        onDelete={handleDeleteTodo}
                      />
                    ))
                  )}
                  
                  {/* Completed Todos */}
                  {completedTodos.length > 0 && (
                    <>
                      <hr className="my-4" />
                      <h2>Completed</h2>
                      {completedTodos.map(todo => (
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          onToggleComplete={handleToggleComplete}
                          onDelete={handleDeleteTodo}
                        />
                      ))}
                    </>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;