import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default function NewTaskForm({ onAddTask = () => {} }) {
  const [description, setDescription] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const taskRef = useRef(null);

  const validateNum = (str, time) => {
    const min = time === 'minutes' ? +str : minutes;
    const sec = time === 'seconds' ? +str : seconds;
    const isNotNum = Number.isNaN(+str[str.length - 1]);
    const isEmpty = str === '';
    const isHour = min * 60 + sec <= 3600;
    const isUnderSixty = +str <= 60;
    return isEmpty || (!isNotNum && isUnderSixty && isHour);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onMinutesChange = (e) => {
    if (validateNum(e.target.value, 'minutes')) {
      setMinutes(e.target.value.trim());
    }
  };

  const onSecondsChange = (e) => {
    if (validateNum(e.target.value, 'seconds')) {
      setSeconds(e.target.value.trim());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timerStamp = (+minutes * 60 + +seconds) * 1000;

    onAddTask(description, timerStamp);
    setDescription('');
    setMinutes('');
    setSeconds('');
    taskRef.current.focus();
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input
          ref={taskRef}
          className="new-todo"
          placeholder="Task"
          onChange={onDescriptionChange}
          value={description}
          name="task-description"
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={onMinutesChange}
          value={minutes}
          name="minutes"
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={onSecondsChange}
          value={seconds}
          name="seconds"
        />
        <button type="submit" aria-label="Submit" />
      </form>
    </header>
  );
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func,
};
