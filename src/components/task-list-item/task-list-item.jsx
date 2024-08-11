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
    this.props.updateTask(this.props.id, this.state.label);
    this.setState({ edited: false });
  };

  render() {
    const { description, taskDate, onDeleted, onToggleCompleted, completed, id } = this.props;
    const { edited, label } = this.state;
    let listClassNames = 'todo-list-item';
    if (completed) {
      listClassNames += ' completed';
    }
    if (edited) listClassNames += ' editing';
    return (
      <li className={listClassNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleCompleted} defaultChecked={completed} id={id} />
          <label>
            <span className="title">{description}</span>
            <Timer />
            <span className="description">{`created ${formatDistanceToNowStrict(taskDate, { addSuffix: true })}`}</span>
          </label>
          <button type="button" aria-label="edit" className="icon icon-edit" onClick={this.onEdited} />
          <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <form onSubmit={this.submitEditing}>
          <input type="text" className="edit" onChange={this.onChangeDescription} value={label} />
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
