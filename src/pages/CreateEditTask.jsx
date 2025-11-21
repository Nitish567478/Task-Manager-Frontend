import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './TaskForm.css';

const CreateEditTask = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ title: '', description: '', status: 'pending' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      API.get(`/tasks/${id}`)
        .then(r => setForm(r.data))
        .catch(e => setErr(e.response?.data?.message || 'Failed'));
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await API.put(`/tasks/${id}`, form);
      } else {
        await API.post('/tasks', form);
      }
      navigate('/');
    } catch (e) {
      setErr(e.response?.data?.message || 'Save failed');
    }
  };

  return (
    <div className="task-wrapper">
      <h2 className="task-title">{isEdit ? 'Edit Task' : 'Create Task'}</h2>

      <form onSubmit={submit} className="task-form">
        <input
          className="task-input"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          className="task-textarea"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="task-select"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">pending</option>
          <option value="in-progress">in-progress</option>
          <option value="completed">completed</option>
        </select>

        <button type="submit" className="task-submit">
          {isEdit ? 'Update' : 'Create'}
        </button>
      </form>

      {err && <p className="task-error">{err}</p>}
    </div>
  );
};

export default CreateEditTask;
