import React, { useState } from 'react';

import './app.css';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filterState, setFilterState] = useState('all');
  const [ID, setID] = useState(1);

  function createTaskItem(description, initialTimer) {
    setID((prevID) => prevID + 1);
    return {
      description,
      taskDate: Date.now(),
      completed: false,
      id: ID,
      initialTimer,
    };
  }

  const deleteTask = (id) => {
    setTasks((prevTasks) => {
      const idx = prevTasks.findIndex((task) => task.id === id);
      return [...prevTasks.slice(0, idx), ...prevTasks.slice(idx + 1)];
    });
  };

  const addTask = (taskText, initialTimer) => {
    if (!taskText) return;
    setTasks((prevTasks) => {
      const newTask = createTaskItem(taskText, initialTimer);
      return [...prevTasks, newTask];
    });
  };

  const onToggleCompleted = (id) => {
    setTasks((prevTasks) => {
      const idx = tasks.findIndex((task) => task.id === id);
      const toggledItem = { ...prevTasks[idx], completed: !prevTasks[idx].completed, initialTimer: 0 };
      return [...prevTasks.slice(0, idx), toggledItem, ...prevTasks.slice(idx + 1)];
    });
  };

  const clearCompleted = () => {
    setTasks((prevTasks) => {
      const unCompletedTasks = prevTasks.filter((item) => !item.completed);
      return unCompletedTasks;
    });
  };

  const onAllFilter = () => {
    setFilterState('all');
  };

  const onActiveFilter = () => {
    setFilterState('active');
  };

  const onCompletedFilter = () => {
    setFilterState('completed');
  };

  const updateTaskDescription = (id, text) => {
    if (!text.trim()) return;

    setTasks((prevTasks) => {
      const idx = tasks.findIndex((task) => task.id === id);
      const updatedItem = { ...prevTasks[idx], description: text };
      return [...prevTasks.slice(0, idx), updatedItem, ...prevTasks.slice(idx + 1)];
    });
  };

  const completeCount = tasks.filter((item) => !item.completed).length;

  return (
    <section className="todoapp">
      <NewTaskForm onAddTask={addTask} />
      <section className="main">
        <TaskList
          tasks={tasks}
          filterState={filterState}
          onDeleted={deleteTask}
          onToggleCompleted={onToggleCompleted}
          updateTaskDescription={updateTaskDescription}
        />
        <Footer
          filterState={filterState}
          leftTasks={completeCount}
          clearCompleted={clearCompleted}
          onAllFilter={onAllFilter}
          onActiveFilter={onActiveFilter}
          onCompletedFilter={onCompletedFilter}
        />
      </section>
    </section>
  );
}
