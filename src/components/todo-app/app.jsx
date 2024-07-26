import React, { Component } from 'react';

import './app.css';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

export default class App extends Component {
  static filterTasks(items, filter) {
    if (filter === 'all') return items;

    if (filter === 'active') {
      return items.filter((item) => !item.completed);
    }
    if (filter === 'completed') {
      return items.filter((item) => item.completed);
    }

    return null;
  }

  maxId = 100;

  state = {
    tasks: [],
    filterState: 'all',
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((task) => task.id === id);
      return {
        tasks: [...tasks.slice(0, idx), ...tasks.slice(idx + 1)],
      };
    });
  };

  addTask = (taskText) => {
    if (!taskText) return;
    this.setState(({ tasks }) => {
      const newTask = this.createTaskItem(taskText);
      return {
        tasks: [...tasks, newTask],
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((task) => task.id === id);
      const toggledItem = { ...tasks[idx], completed: !tasks[idx].completed };
      return {
        tasks: [...tasks.slice(0, idx), toggledItem, ...tasks.slice(idx + 1)],
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const unCompletedTasks = tasks.filter((item) => !item.completed);
      return { tasks: unCompletedTasks };
    });
  };

  onAllFilter = () => {
    this.setState({
      filterState: 'all',
    });
  };

  onActiveFilter = () => {
    this.setState({
      filterState: 'active',
    });
  };

  onCompletedFilter = () => {
    this.setState({
      filterState: 'completed',
    });
  };

  updateTask = (id, text) => {
    if (!text.trim()) return;

    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((task) => task.id === id);
      const updatedItem = { ...tasks[idx], description: text };
      return {
        tasks: [...tasks.slice(0, idx), updatedItem, ...tasks.slice(idx + 1)],
      };
    });
  };

  createTaskItem(description) {
    return {
      description,
      taskDate: Date.now(),
      completed: false,
      id: ++this.maxId,
    };
  }

  render() {
    const { tasks, filterState } = this.state;

    const completeCount = tasks.filter((item) => !item.completed).length;

    const visibleTasks = App.filterTasks(tasks, filterState);

    return (
      <section className="todoapp">
        <NewTaskForm onAddTask={this.addTask} />
        <section className="main">
          <TaskList
            tasks={visibleTasks}
            filterState={filterState}
            onDeleted={this.deleteTask}
            onToggleCompleted={this.onToggleCompleted}
            updateTask={this.updateTask}
          />
          <Footer
            filterState={filterState}
            leftTasks={completeCount}
            clearCompleted={this.clearCompleted}
            onAllFilter={this.onAllFilter}
            onActiveFilter={this.onActiveFilter}
            onCompletedFilter={this.onCompletedFilter}
          />
        </section>
      </section>
    );
  }
}
