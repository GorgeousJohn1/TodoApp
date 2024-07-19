import React from 'react';
import './footer.css';
import TaskFilter from '../task-filter/task-filter';
const Footer = ({
  filterState,
  leftTasks,
  clearCompleted,
  onAllFilter,
  onActiveFilter,
  onCompletedFilter,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        {leftTasks === 1 ? `${leftTasks} item left` : `${leftTasks} items left`}
      </span>
      <TaskFilter
        filterState={filterState}
        onAllFilter={onAllFilter}
        onActiveFilter={onActiveFilter}
        onCompletedFilter={onCompletedFilter}
      />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};
export default Footer;
