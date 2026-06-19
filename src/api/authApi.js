import { api } from './client';
import { getApiErrorMessage, normalizeAuthResponse } from './helpers';

const buildAuthPayload = ({ login, password, name }) => {
  const payload = {
    login: login.trim(),
    password: password.trim(),
  };

  if (typeof name === 'string') {
    payload.name = name.trim();
  }

  return payload;
};

export const loginUser = async ({ login, password }) => {
  try {
    const response = await api.post('/user/login', buildAuthPayload({ login, password }));
    return normalizeAuthResponse(response.data, { login: login.trim() });
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Не удалось выполнить вход'));
  }
};

export const registerUser = async ({ name, login, password }) => {
  const fallbackUser = { name: name.trim(), login: login.trim() };

  try {
    const response = await api.post('/user', buildAuthPayload({ name, login, password }));
    const normalized = normalizeAuthResponse(response.data, fallbackUser);

    if (normalized.token) {
      return normalized;
    }

    return loginUser({ login, password });
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Не удалось выполнить регистрацию'));
  }
};
