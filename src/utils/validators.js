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

export function validateTransaction({ description, category, date, sum }) {
  if (!description.trim()) {
    return 'Введите описание расхода';
  }

  if (!category) {
    return 'Выберите категорию';
  }

  if (!date) {
    return 'Выберите дату';
  }

  if (!Number(sum) || Number(sum) <= 0) {
    return 'Введите сумму больше нуля';
  }

  return '';
}
