import React from 'react';
import './task-list.css';
import TaskListItem from '../task-list-item/task-list-item';
const TaskList = ({
  tasks,
  filterState,
  onDeleted,
  onToggleCompleted,
  updateTask,
}) => {
  const tasksArray = tasks.map((task) => {
    const { id, ...taskProps } = task;
    return (
      <TaskListItem
        key={id}
        id={id}
        {...taskProps}
        filterState={filterState}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => {
          onToggleCompleted(id);
        }}
        updateTask={updateTask}
      />
    );
  });

  return <ul className="todo-list">{tasksArray}</ul>;
};
export default TaskList;
