import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };

  return (
    <div className="auth-page">
      <div className="auth-page__inner">
        <AuthCard title="Вход">
          <form className="auth-form">
            <label>
              <span>Логин</span>
              <input name="login" placeholder="Логин" />
            </label>
            <label>
              <span>Пароль</span>
              <input name="password" type="password" placeholder="Пароль" />
            </label>
            <button
              type="button"
              className="primary-button"
              onClick={handleLogin}
            >
              Войти
            </button>
          </form>
          <div className="auth-note">
            <p>Нужно зарегистрироваться?</p>
            <Link to="/register">Регистрируйтесь здесь.</Link>
          </div>
        </AuthCard>
      </div>
    </div>
  );
}

export default LoginPage;
