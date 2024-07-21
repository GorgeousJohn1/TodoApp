import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

import './task-list-item.css';

export default class TaskListItem extends Component {
  static defaultProps = {
    description: 'default task',
    taskDate: Date.now(),
    completed: false,
    onDeleted: () => {},
    onToggleCompleted: () => {},
    updateTask: () => {},
  };

  static propTypes = {
    description: PropTypes.string,
    taskDate: PropTypes.number,
    completed: PropTypes.bool,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    updateTask: PropTypes.func,
  };

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
    this.props.updateTask(this.props.id, this.state.label);
    this.setState({ edited: false });
  };

  render() {
    const { description, taskDate, onDeleted, onToggleCompleted, completed } =
      this.props;
    let listClassNames = 'todo-list-item';
    if (completed) {
      listClassNames += ' completed';
    }
    if (this.state.edited) listClassNames += ' editing';
    return (
      <li className={listClassNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={onToggleCompleted}
            defaultChecked={completed}
          />
          <label>
            <span className="description">{description}</span>
            <span className="created">{`created ${formatDistanceToNowStrict(
              taskDate,
              { addSuffix: true }
            )}`}</span>
          </label>
          <button className="icon icon-edit" onClick={this.onEdited}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.submitEditing}>
          <input
            type="text"
            className="edit"
            onChange={this.onChangeDescription}
            value={this.state.label}
            autoFocus={this.state.edited}
          />
        </form>
      </li>
    );
  }
}
