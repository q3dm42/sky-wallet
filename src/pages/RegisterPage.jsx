import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import { useAuth } from '../hooks/useAuth';
import { validateRegisterForm } from '../utils/validators';

function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', login: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const message = validateRegisterForm(formData);

    if (message) {
      setError(message);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const payload = await registerUser(formData);
      login(payload);
      navigate('/expenses');
    } catch (apiError) {
      setError(apiError.message || 'Не удалось выполнить регистрацию');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader />
      <div className="auth-page">
        <div className="auth-page__inner">
          <AuthCard title="Регистрация">
            <form className="auth-form" onSubmit={handleRegister}>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Имя"
                disabled={loading}
              />
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
                {loading ? 'Регистрируем...' : 'Зарегистрироваться'}
              </button>
            </form>
            <div className="auth-note">
              <p>Уже есть аккаунт?</p>
              <Link to="/login">Войдите здесь</Link>
            </div>
          </AuthCard>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
