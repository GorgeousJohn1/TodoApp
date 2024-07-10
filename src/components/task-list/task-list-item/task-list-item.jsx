import './task-list-item.css';

const TaskListItem = () => {
  return (
    <li className="editing">
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label>
          <span class="description">Completed task</span>
          <span class="created">1 secs ago</span>
        </label>
        <button class="icon icon-edit"></button>
        <button class="icon icon-destroy"></button>
      </div>
      <input type="text" className="edit" value="Editing task" />
    </li>
  );
};
export default TaskListItem;
