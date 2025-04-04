import React from 'react';
import { Button } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant={theme === 'light' ? 'outline-dark' : 'outline-light'} 
      onClick={toggleTheme}
      className="me-2"
      size="sm"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </Button>
  );
};

export default ThemeToggle;