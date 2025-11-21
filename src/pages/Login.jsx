import { useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [err, setErr] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      login(res.data.token, res.data.user);

      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="login-wrapper">
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Login</button>
        <p className=''>Create a new account <Link to="/register">Register</Link></p>
      </form>

      {err && <p className="error-msg">{err}</p>}
    </div>
  );
};

export default Login;
