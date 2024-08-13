import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

import Timer from '../timer/Timer';

import './task-list-item.css';

export default class TaskListItem extends Component {
  state = {
    edited: false,
    label: this.props.description,
  };

  onEdited = () => {
    this.setState({ edited: true });
  };

  onChangeDescription = (e) => {
    this.setState({ label: e.target.value });
  };

  submitEditing = (e) => {
    e.preventDefault();
    this.props.updateTask(this.props.id, this.state.label, this.props.timerStamp);
    this.setState({ edited: false });
  };

  filterDisplay = () => {
    const { completed, filterState } = this.props;
    const visible = { display: 'list-item' };
    if (filterState === 'all') return visible;
    if (filterState === 'active' && !completed) return visible;
    if (filterState === 'completed' && completed) return visible;
    return { display: 'none' };
  };

  render() {
    const { description, taskDate, onDeleted, onToggleCompleted, updateTask, completed, id, timerStamp } = this.props;
    const { edited, label } = this.state;
    let listClassNames = 'todo-list-item';
    if (completed) {
      listClassNames += ' completed';
    }
    if (edited) listClassNames += ' editing';

    return (
      <li className={listClassNames} style={this.filterDisplay()}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleCompleted} defaultChecked={completed} id={id} />
          <label>
            <span className="title">{description}</span>
            <Timer timerStamp={timerStamp} updateTask={updateTask} id={id} description={description} />
            <span className="description">{`created ${formatDistanceToNowStrict(taskDate, { addSuffix: true })}`}</span>
          </label>
          <button type="button" aria-label="edit" className="icon icon-edit" onClick={this.onEdited} />
          <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <form onSubmit={this.submitEditing}>
          <input
            type="text"
            className="edit"
            onChange={this.onChangeDescription}
            onKeyDown={(e) => {
              if (e.key === 'Escape') this.setState({ edited: false });
            }}
            value={label}
          />
        </form>
      </li>
    );
  }
}

TaskListItem.defaultProps = {
  description: 'default task',
  taskDate: Date.now(),
  completed: false,
  onDeleted: () => {},
  onToggleCompleted: () => {},
  updateTask: () => {},
};

TaskListItem.propTypes = {
  description: PropTypes.string,
  taskDate: PropTypes.number,
  completed: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  updateTask: PropTypes.func,
};
