import React from 'react';
import PropTypes, { bool } from 'prop-types';

import './task-list.css';
import TaskListItem from '../task-list-item/task-list-item';

function TaskList({
  tasks = {},
  onDeleted = () => {},
  onToggleCompleted = () => {},
  updateTask = () => {},
  filterState = '',
}) {
  const tasksArray = tasks.map((task) => {
    const { description, taskDate, completed, id, timerStamp } = task;

    return (
      <TaskListItem
        key={id}
        id={id}
        description={description}
        taskDate={taskDate}
        completed={completed}
        timerStamp={timerStamp}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => {
          onToggleCompleted(id);
        }}
        updateTask={updateTask}
        filterState={filterState}
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
