import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import { useAuth } from '../hooks/useAuth';
import { validateLoginForm } from '../utils/validators';

function LoginPage() {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const message = validateLoginForm(formData);

    if (message) {
      setError(message);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const payload = await loginUser(formData);
      login(payload);
      navigate('/expenses');
    } catch (apiError) {
      setError(apiError.message || 'Не удалось выполнить вход');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader />
      <div className="auth-page">
        <div className="auth-page__inner">
          <AuthCard title="Вход">
            <form className="auth-form" onSubmit={handleLogin}>
              <input
                name="login"
                value={formData.login}
                onChange={handleChange}
                placeholder="Логин"
                disabled={loading}
              />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Пароль"
                disabled={loading}
              />
              {error ? <p className="form-error form-error--center">{error}</p> : null}
              <button type="submit" className="primary-button" disabled={loading}>
                {loading ? 'Входим...' : 'Войти'}
              </button>
            </form>
            <div className="auth-note">
              <p>Нужно зарегистрироваться?</p>
              <Link to="/register">Регистрируйтесь здесь.</Link>
            </div>
          </AuthCard>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
