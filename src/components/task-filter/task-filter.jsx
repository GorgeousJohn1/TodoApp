import React, { Component } from 'react';
import './task-filter.css';

export default class TaskFilter extends Component {
  render() {
    const { filterState, onAllFilter, onActiveFilter, onCompletedFilter } =
      this.props;

    return (
      <ul className="filters">
        <li>
          <button
            className={filterState === 'all' ? 'selected' : null}
            onClick={onAllFilter}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={filterState === 'active' ? 'selected' : null}
            onClick={onActiveFilter}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={filterState === 'completed' ? 'selected' : null}
            onClick={onCompletedFilter}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
