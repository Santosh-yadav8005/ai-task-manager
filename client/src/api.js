const API_URL = "https://ai-task-manager-backend-eh0o.onrender.com";





// Fetch all tasks
export async function fetchTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
}

// Create new task
export async function createTask(data) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Update a task
export async function updateTask(id, data) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Delete a task
export async function deleteTask(id) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
}

// AI Auto Split
export async function getAISubtasks(title) {
  const res = await fetch(`${API_URL}/ai/suggest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  return res.json(); // { subtasks: [...] }
}
