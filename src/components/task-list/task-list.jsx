import React from 'react';
import PropTypes from 'prop-types';

import './task-list.css';
import TaskListItem from '../task-list-item/task-list-item';

const TaskList = ({
  tasks,
  onDeleted = () => {},
  onToggleCompleted = () => {},
  updateTask = () => {},
}) => {
  const tasksArray = tasks.map((task) => {
    const { id, ...taskProps } = task;
    return (
      <TaskListItem
        key={id}
        id={id}
        {...taskProps}
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

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  updateTask: PropTypes.func,
};
export default TaskList;
