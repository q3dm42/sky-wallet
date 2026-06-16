import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import { useAuth } from '../hooks/useAuth';

function RegisterPage() {
  const { login } = useAuth();

  const handleRegister = () => {
    login();
  };

  return (
    <>
      <AuthHeader />
      <div className="auth-page">
        <div className="auth-page__inner">
          <AuthCard title="Регистрация">
            <form className="auth-form">
              <input name="name" placeholder="Имя" />
              <input name="login" placeholder="Логин" />
              <input name="password" type="password" placeholder="Пароль" />
              <button type="button" className="primary-button" onClick={handleRegister}>
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
    </>
  );
}

export default RegisterPage;
