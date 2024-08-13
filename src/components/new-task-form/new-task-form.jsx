import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    description: '',
    minutes: '',
    seconds: '',
  };

  validateNum = (str, time) => {
    const { minutes, seconds } = this.state;

    const min = time === 'minutes' ? +str : minutes;
    const sec = time === 'seconds' ? +str : seconds;
    const isNotNum = Number.isNaN(+str[str.length - 1]);
    const isEmpty = str === '';
    const isHour = min * 60 + sec <= 3600;
    const isUnderSixty = +str <= 60;
    return isEmpty || (!isNotNum && isUnderSixty && isHour);
  };

  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onMinutesChange = (e) => {
    if (this.validateNum(e.target.value, 'minutes')) {
      this.setState({
        minutes: e.target.value.trim(),
      });
    }
  };

  onSecondsChange = (e) => {
    if (this.validateNum(e.target.value, 'seconds')) {
      this.setState({
        seconds: e.target.value.trim(),
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onAddTask } = this.props;
    const { description, minutes, seconds } = this.state;
    const timerStamp = (+minutes * 60 + +seconds) * 1000;

    onAddTask(description, timerStamp);
    this.setState({
      description: '',
      minutes: '',
      seconds: '',
    });
  };

  render() {
    const { description, minutes, seconds } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.handleSubmit}>
          <input className="new-todo" placeholder="Task" onChange={this.onDescriptionChange} value={description} />
          <input
            type="text"
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.onMinutesChange}
            value={minutes}
          />
          <input
            type="text"
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onSecondsChange}
            value={seconds}
          />
          <button type="submit" aria-label="Submit" />
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  onAddTask: () => {},
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func,
};
