import { formatDistance, subMinutes } from 'date-fns';
const datee = formatDistance(subMinutes(new Date(), 3), new Date(), {
  addSuffix: true,
});
const TaskListItem = () => {
  return (
    <li className="editing">
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label>
          <span class="description">Completed task</span>
          <span class="created">{datee}</span>
        </label>
        <button class="icon icon-edit"></button>
        <button class="icon icon-destroy"></button>
      </div>
      <input type="text" className="edit" value="Editing task" />
    </li>
  );
};
export default TaskListItem;
