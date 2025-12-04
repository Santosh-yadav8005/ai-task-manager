export default function TaskItem({ task, onUpdate, onDelete, onAISuggest }) {
  // Deadline text format
  const deadlineText = task.deadline
    ? new Date(task.deadline).toLocaleString()
    : "No deadline";

  // Update status
  const handleStatusChange = (e) => {
    onUpdate(task._id, { status: e.target.value });
  };

  // Toggle subtask done/undone
  const toggleSubtask = (index) => {
    const updatedSubtasks = task.subtasks.map((s, i) =>
      i === index ? { ...s, done: !s.done } : s
    );
    onUpdate(task._id, { subtasks: updatedSubtasks });
  };

  // Priority badge color
  const getPriorityClass = () => {
    if (task.priority === "high") return "tag tag-high";
    if (task.priority === "low") return "tag tag-low";
    return "tag tag-medium";
  };

  return (
    <div className="card" style={{ marginBottom: "0.75rem" }}>
      {/* Title + Priority */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>{task.title}</h3>
        <span className={getPriorityClass()}>{task.priority}</span>
      </div>

      {/* Deadline */}
      <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
        Deadline: {deadlineText}
      </p>

      {/* Status */}
      <label style={{ fontSize: "0.85rem" }}>
        Status:{" "}
        <select value={task.status} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      {/* Buttons */}
      <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
        <button onClick={() => onAISuggest(task._id, task.title)}>
          Auto Split (AI)
        </button>

        <button className="btn-danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>

      {/* Subtasks */}
      {task.subtasks && task.subtasks.length > 0 && (
        <ul className="subtasks">
          {task.subtasks.map((s, i) => (
            <li key={i} className="subtask-item">
              <input
                type="checkbox"
                checked={s.done}
                onChange={() => toggleSubtask(i)}
              />
              <span>{s.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
