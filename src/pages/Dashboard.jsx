import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import FullCalendar from "../components/FullCalendar";

import "./Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const { user } = useContext(AuthContext);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (e) {
      alert(e.response?.data?.message || "Delete failed");
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());

    if (!selectedDate) return matchesSearch;

    const taskDate = new Date(t.createdAt);
    return (
      matchesSearch &&
      taskDate.getFullYear() === selectedDate.getFullYear() &&
      taskDate.getMonth() === selectedDate.getMonth() &&
      taskDate.getDate() === selectedDate.getDate()
    );
  });

  return (
    <div className="dash-container">

      <aside className="calendar-sidebar">
        <h2 className="calendar-title">Calendar</h2>
        <FullCalendar onDateSelect={setSelectedDate} />
      </aside>

      <div className="flex-1">

        <div className="top-bar">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <Link to="/create" className="btn-create">
            Create Task
          </Link>
        </div>

        <h2 className="dashboard-title">Dashboard</h2>

        <p className="user-info">
          Logged in as {user?.username} ({user?.role})
        </p>

        {selectedDate && (
          <p className="selected-date">
            Showing tasks for {selectedDate.toDateString()}
          </p>
        )}

        {err && <p className="error-text">{err}</p>}

        {filteredTasks.length === 0 ? (
          <p className="empty-state">No tasks found.</p>
        ) : (
          <div className="task-grid">
            {filteredTasks.map((t) => (
              <div key={t.id} className="task-card-custom">

                <div className="task-card-header">
                  <h3 className="task-title">{t.title}</h3>
                  <span className="task-status">{t.status}</span>
                </div>

                <p className="task-desc">{t.description}</p>

                <div className="task-card-meta">
                  <span className="task-meta-author">{t.author || "Unknown"}</span>
                  <span>{t.createdAt}</span>
                </div>

                <div className="task-card-actions">
                  {(user.role === "admin" || t.createdBy === user.id) && (
                    <Link to={`/edit/${t.id}`} className="btn-edit-custom">
                      Edit
                    </Link>
                  )}

                  {(user.role === "admin" || t.createdBy === user.id) && (
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="btn-delete-custom"
                    >
                      Delete
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
