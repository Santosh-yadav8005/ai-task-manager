const API_URL = "https://ai-task-manager-backend-eh0o.onrender.com";

// Fetch all tasks
export async function fetchTasks() {
  const res = await fetch(`${API_URL}/api/tasks`);
  return res.json();
}

// Create new task
export async function createTask(data) {
  const res = await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Update task
export async function updateTask(id, data) {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Delete task
export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

// AI Auto Split (GET) - used by frontend
export async function getAISubtasks(taskTitle) {
  const res = await fetch(
    `${API_URL}/api/ai/split?title=${encodeURIComponent(taskTitle)}`
  );
  return res.json();
}
