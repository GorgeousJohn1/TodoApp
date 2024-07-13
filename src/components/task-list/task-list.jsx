import React from 'react';
import './task-list.css';
import TaskListItem from '../task-list-item/task-list-item';
const TaskList = ({ tasks, onDeleted }) => {
  const tasksArray = tasks.map((task) => {
    const { id, ...taskProps } = task;
    return (
      <TaskListItem key={id} {...taskProps} onDeleted={() => onDeleted(id)} />
    );
  });

  return <ul className="todo-list">{tasksArray}</ul>;
};
export default TaskList;
