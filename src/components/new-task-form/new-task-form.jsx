import React, { Component } from 'react';
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
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onAddTask(this.state.description);
              this.setState({
                description: '',
              });
            }
          }}
          onChange={this.onDescriptionChange}
          value={this.state.description}
        />
      </header>
    );
  }
}
