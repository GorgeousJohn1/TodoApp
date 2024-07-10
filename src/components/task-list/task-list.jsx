import TaskListItem from '../task-list-item/task-list-item';
const TaskList = () => {
  return (
    <ul className="todo-list">
      <TaskListItem />
      <TaskListItem />
      <TaskListItem />
    </ul>
  );
};
export default TaskList;
