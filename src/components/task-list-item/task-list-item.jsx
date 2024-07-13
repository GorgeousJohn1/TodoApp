import React, { Component } from 'react';
import './task-list-item.css';

export default class TaskListItem extends Component {
  state = {
    completed: false,
  };

  onToggleClick = () => {
    this.setState(({ completed }) => {
      return { completed: !completed };
    });
  };

  render() {
    const { description, created, onDeleted } = this.props;
    const { completed } = this.state;
    let classNames = 'todo-list-item';
    if (completed) classNames += ' completed';
    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={this.onToggleClick}
          />
          <label>
            <span className="description">{description}</span>
            <span className="created">{created}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" />
      </li>
    );
  }
}

// <li className="todo-list-item EDITING">
