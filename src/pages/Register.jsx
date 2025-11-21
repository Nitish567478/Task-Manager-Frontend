import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

import './Register.css';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch (error) {
      setErr(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="register-wrapper">
      <h2>Create Account</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Register</button>
      </form>

      {err && <p className="error-msg">{err}</p>}
    </div>
  );
};

export default Register;
