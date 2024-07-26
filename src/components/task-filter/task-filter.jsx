import React from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

function TaskFilter({ filterState, onAllFilter, onActiveFilter, onCompletedFilter }) {
  return (
    <ul className="filters">
      <li>
        <button type="button" className={filterState === 'all' ? 'selected' : null} onClick={onAllFilter}>
          All
        </button>
      </li>
      <li>
        <button type="button" className={filterState === 'active' ? 'selected' : null} onClick={onActiveFilter}>
          Active
        </button>
      </li>
      <li>
        <button type="button" className={filterState === 'completed' ? 'selected' : null} onClick={onCompletedFilter}>
          Completed
        </button>
      </li>
    </ul>
  );
}

TaskFilter.defaultProps = {
  filterState: 'all',
  onAllFilter: () => {},
  onActiveFilter: () => {},
  onCompletedFilter: () => {},
};

TaskFilter.propTypes = {
  filterState: PropTypes.string,
  onAllFilter: PropTypes.func,
  onActiveFilter: PropTypes.func,
  onCompletedFilter: PropTypes.func,
};

export default TaskFilter;
