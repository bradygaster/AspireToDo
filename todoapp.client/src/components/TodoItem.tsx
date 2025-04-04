import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaCheck, FaTrash, FaUndo } from 'react-icons/fa';
import { Todo } from '../models/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {
  // Format date if available
  const formattedDate = todo.dateCompleted 
    ? new Date(todo.dateCompleted).toLocaleDateString() 
    : '';

  return (
    <Card 
      className="mb-2" 
      style={{ 
        opacity: todo.isComplete ? 0.7 : 1,
        transition: 'all 0.3s ease'
      }}
    >
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div style={{ textAlign: 'left' }}>
          <Card.Title 
            style={{ 
              textDecoration: todo.isComplete ? 'line-through' : 'none',
              textAlign: 'left'
            }}
          >
            {todo.description}
          </Card.Title>
          {todo.isComplete && formattedDate && (
            <Card.Subtitle className="mb-2 text-muted" style={{ textAlign: 'left' }}>
              Completed on {formattedDate}
            </Card.Subtitle>
          )}
        </div>
        <div>
          <Button 
            variant={todo.isComplete ? "outline-primary" : "outline-success"} 
            className="me-2" 
            onClick={() => onToggleComplete(todo)}
          >
            <span className="d-inline-block me-1">
              {todo.isComplete ? FaUndo({size: 14}) : FaCheck({size: 14})}
            </span>
            {todo.isComplete ? 'Mark Incomplete' : 'Complete'}
          </Button>
          <Button 
            variant="outline-danger" 
            onClick={() => onDelete(todo.id)}
          >
            <span className="d-inline-block me-1">{FaTrash({size: 14})}</span> Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TodoItem;