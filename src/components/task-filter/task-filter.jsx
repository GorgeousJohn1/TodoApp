import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

export default class TaskFilter extends Component {
  static defaultProps = {
    filterState: 'all',
    onAllFilter: () => {},
    onActiveFilter: () => {},
    onCompletedFilter: () => {},
  };

  static propTypes = {
    filterState: PropTypes.string,
    onAllFilter: PropTypes.func,
    onActiveFilter: PropTypes.func,
    onCompletedFilter: PropTypes.func,
  };

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
