import './task-list-item.css';

const TaskListItem = () => {
  return (
    <li className="todo-list-item">
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description"></span>
          <span className="created">1 secs ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      <input type="text" className="edit" value="Editing task" />
    </li>
  );
};
export default TaskListItem;
// <li className="todo-list-item EDITING">
