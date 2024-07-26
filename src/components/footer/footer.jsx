import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';
import TaskFilter from '../task-filter/task-filter';

function Footer({ filterState, leftTasks, clearCompleted, onAllFilter, onActiveFilter, onCompletedFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{leftTasks === 1 ? `${leftTasks} item left` : `${leftTasks} items left`}</span>
      <TaskFilter
        filterState={filterState}
        onAllFilter={onAllFilter}
        onActiveFilter={onActiveFilter}
        onCompletedFilter={onCompletedFilter}
      />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  filterState: 'all',
  leftTasks: 0,
  clearCompleted: () => {},
  onAllFilter: () => {},
  onActiveFilter: () => {},
  onCompletedFilter: () => {},
};

Footer.propTypes = {
  filterState: PropTypes.string,
  leftTasks: PropTypes.number,
  clearCompleted: PropTypes.func,
  onAllFilter: PropTypes.func,
  onActiveFilter: PropTypes.func,
  onCompletedFilter: PropTypes.func,
};

export default Footer;
