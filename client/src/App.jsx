import { useEffect, useState } from "react";
import "./App.css";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  getAISubtasks,
} from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks on start
  const loadTasks = async () => {
    setLoading(true);
    const data = await fetchTasks();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Add task
  const handleAddTask = async (taskData) => {
    const newTask = await createTask(taskData);
    setTasks((prev) => [newTask, ...prev]);
  };

  // Update task
  const handleUpdateTask = async (id, updates) => {
    const updated = await updateTask(id, updates);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  // AI Suggest
  const handleAISuggest = async (id, title) => {
    const { subtasks } = await getAISubtasks(title);

    const updated = await updateTask(id, {
      subtasks: subtasks.map((s) => ({ title: s, done: false })),
    });

    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  return (
    <div className="app">
      <div className="app-title">
        <h1>AI Task Manager</h1>
        <p style={{ opacity: 0.8 }}>Smart To-Do with AI Task Splitting</p>
      </div>

      <div className="layout">
        {/* Left side: Task Form */}
        <TaskForm onAdd={handleAddTask} />

        {/* Right side: Task List */}
        <div>
          {loading ? (
            <div className="card">Loading tasks...</div>
          ) : (
            <TaskList
              tasks={tasks}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onAISuggest={handleAISuggest}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
