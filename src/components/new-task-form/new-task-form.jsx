import React from 'react';
import './new-task-form.css';
const NewTaskForm = ({ onAddTask }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={(e) => {
          if (e.key === 'Enter') onAddTask('New added task');
        }}
      />
    </header>
  );
};
export default NewTaskForm;
