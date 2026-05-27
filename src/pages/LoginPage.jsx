import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };

  return (
    <>
      <AuthHeader />
      <div className="auth-page">
        <div className="auth-page__inner">
          <AuthCard title="Вход">
            <form className="auth-form">
              <input name="login" placeholder="Логин" />
              <input name="password" type="password" placeholder="Пароль" />
              <button type="button" className="primary-button" onClick={handleLogin}>
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
    </>
  );
}

export default LoginPage;
