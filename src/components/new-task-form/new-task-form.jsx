import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    description: '',
  };

  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  render() {
    const { onAddTask } = this.props;
    const { description } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            placeholder="Task"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAddTask(description);
                this.setState({
                  description: '',
                });
              }
            }}
            onChange={this.onDescriptionChange}
            value={description}
          />
          <input type="text" className="new-todo-form__timer" placeholder="Min" />
          <input type="text" className="new-todo-form__timer" placeholder="Sec" />
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
