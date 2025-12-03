import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onUpdate, onDelete, onAISuggest }) {
  if (!tasks || tasks.length === 0) {
    return <div className="card">No tasks yet.</div>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onAISuggest={onAISuggest}
        />
      ))}
    </div>
  );
}
