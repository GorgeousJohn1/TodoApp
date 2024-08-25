import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

import Timer from '../timer/Timer';

import './task-list-item.css';

export default function TaskListItem({
  description = 'default task',
  taskDate = Date.now(),
  onDeleted = () => {},
  onToggleCompleted = () => {},
  updateTaskDescription = () => {},
  completed = false,
  id,
  initialTimer,
  filterState,
}) {
  const [edited, setEdited] = useState(false);
  const [label, setLabel] = useState(description);

  const editedRef = useRef(null);

  useEffect(() => {
    if (edited) editedRef.current.focus();
  }, [edited]);

  const onEdited = () => {
    setEdited(true);
  };

  const onChangeDescription = (e) => {
    setLabel(e.target.value);
  };

  const submitEditing = (e) => {
    e.preventDefault();
    updateTaskDescription(id, label);
    setEdited(false);
  };

  const filterDisplay = () => {
    const visible = { display: 'list-item' };
    if (filterState === 'all') return visible;
    if (filterState === 'active' && !completed) return visible;
    if (filterState === 'completed' && completed) return visible;
    return { display: 'none' };
  };

  let listClassNames = 'todo-list-item';
  if (completed) {
    listClassNames += ' completed';
  }
  if (edited) listClassNames += ' editing';

  return (
    <li className={listClassNames} style={filterDisplay()}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed} id={id} />
        <label>
          <span className="title">{description}</span>
          <Timer
            initialTimer={initialTimer}
            id={id}
            onToggleCompleted={() => onToggleCompleted(id)}
            completed={completed}
          />
          <span className="description">{`created ${formatDistanceToNowStrict(taskDate, { addSuffix: true })}`}</span>
        </label>
        <button type="button" aria-label="edit" className="icon icon-edit" onClick={onEdited} />
        <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <form onSubmit={submitEditing}>
        <input
          ref={editedRef}
          type="text"
          name="edit-description"
          className="edit"
          onChange={onChangeDescription}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setEdited(false);
              setLabel(description);
            }
          }}
          value={label}
        />
      </form>
    </li>
  );
}

TaskListItem.propTypes = {
  description: PropTypes.string,
  taskDate: PropTypes.number,
  completed: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  updateTaskDescription: PropTypes.func,
  id: PropTypes.number.isRequired,
  filterState: PropTypes.string.isRequired,
  initialTimer: PropTypes.number.isRequired,
};
