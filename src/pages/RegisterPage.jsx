import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import { useAuth } from '../hooks/useAuth';

function RegisterPage() {
  const { login } = useAuth();

  const handleRegister = () => {
    login();
  };

  return (
    <div className="auth-page">
      <div className="auth-page__inner">
        <AuthCard title="Регистрация">
          <form className="auth-form">
            <label>
              <span>Имя</span>
              <input name="name" placeholder="Имя" />
            </label>
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
              onClick={handleRegister}
            >
              Зарегистрироваться
            </button>
          </form>
          <div className="auth-note">
            <p>Уже есть аккаунт?</p>
            <Link to="/login">Войдите здесь</Link>
          </div>
        </AuthCard>
      </div>
    </div>
  );
}

export default RegisterPage;
