import React from 'react';
import PropTypes, { bool } from 'prop-types';

import './task-list.css';
import TaskListItem from '../task-list-item/task-list-item';

function TaskList({ tasks = {}, onDeleted = () => {}, onToggleCompleted = () => {}, updateTask = () => {} }) {
  const tasksArray = tasks.map((task) => {
    const { description, taskDate, completed, id } = task;
    return (
      <TaskListItem
        key={id}
        id={id}
        description={description}
        taskDate={taskDate}
        completed={completed}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => {
          onToggleCompleted(id);
        }}
        updateTask={updateTask}
      />
    );
  });

  return <ul className="todo-list">{tasksArray}</ul>;
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      taskDate: PropTypes.number,
      completed: bool,
      id: PropTypes.number,
    })
  ),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  updateTask: PropTypes.func,
};

export default TaskList;
