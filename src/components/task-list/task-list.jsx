import React from 'react';
import PropTypes from 'prop-types';

import './task-list.css';
import TaskListItem from '../task-list-item/task-list-item';

function TaskList({ tasks, onDeleted, onToggleCompleted, updateTask }) {
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

TaskList.defaultProps = {
  tasks: {
    description: 'default',
    taskDate: Date.now(),
    completed: false,
    id: 100,
  },
  onDeleted: () => {},
  onToggleCompleted: () => {},
  updateTask: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  updateTask: PropTypes.func,
};

export default TaskList;
