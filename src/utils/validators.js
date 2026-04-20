export function validateLoginForm({ login, password }) {
  if (!login.trim() || !password.trim()) {
    return 'Введите логин и пароль';
  }
  return '';
}

export function validateRegisterForm({ name, login, password }) {
  if (!name.trim() || !login.trim() || !password.trim()) {
    return 'Заполните все поля для регистрации';
  }
  return '';
}
