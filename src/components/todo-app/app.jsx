import React, { Component } from 'react';
import './app.css';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

export default class App extends Component {
  maxId = 100;

  state = {
    tasks: [
      {
        description: 'Completed task',
        created: 'created 17 seconds ago',
        id: 1,
      },
      { description: 'Editing task', created: 'created 15 seconds ago', id: 2 },
      { description: 'Active task', created: 'created 1 minute ago', id: 3 },
    ],
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((task) => task.id === id);
      return {
        tasks: [...tasks.slice(0, idx), ...tasks.slice(idx + 1)],
      };
    });
  };

  addTask = (text) => {
    this.setState(({ tasks }) => {
      const newTask = {
        description: text,
        created: 'created 1 second ago',
        id: ++this.maxId,
      };
      return {
        tasks: [...tasks, newTask],
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm onAddTask={this.addTask} />
        <section className="main">
          <TaskList tasks={this.state.tasks} onDeleted={this.deleteTask} />
          <Footer />
        </section>
      </section>
    );
  }
}
