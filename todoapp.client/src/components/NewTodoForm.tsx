import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

interface NewTodoFormProps {
  onAddTodo: (description: string) => void;
}

const NewTodoForm: React.FC<NewTodoFormProps> = ({ onAddTodo }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onAddTodo(description.trim());
      setDescription('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Enter a new todo item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="New todo text input"
        />
        <Button type="submit" variant="primary" disabled={!description.trim()} aria-label="Add todo">
          + Add Todo
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewTodoForm;