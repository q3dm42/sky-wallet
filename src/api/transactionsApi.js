import { api } from './client';
import { getApiErrorMessage, normalizeTransactions, toApiDate } from './helpers';

const buildQueryParams = ({ sortBy, filterBy } = {}) => {
  const params = {};

  if (sortBy) {
    params.sortBy = sortBy;
  }

  if (Array.isArray(filterBy) && filterBy.length > 0) {
    params.filterBy = filterBy.join(',');
  }

  if (typeof filterBy === 'string' && filterBy.trim()) {
    params.filterBy = filterBy.trim();
  }

  return params;
};

const createTransactionPayload = (transaction) => ({
  description: String(transaction.description || '').trim(),
  sum: Number(transaction.sum ?? transaction.amount),
  category: transaction.category === 'others' ? 'other' : transaction.category,
  date: toApiDate(transaction.date),
});

const extractTransactionsArray = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.transactions)) {
    return data.transactions;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  return null;
};

const normalizeTransactionsList = (data) => {
  const items = extractTransactionsArray(data);
  return items ? normalizeTransactions(items) : null;
};

export const getTransactions = async (options = {}) => {
  try {
    const response = await api.get('/transactions', {
      params: buildQueryParams(options),
    });

    return normalizeTransactionsList(response.data) ?? [];
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Не удалось загрузить список расходов'));
  }
};

export const addTransaction = async (transaction) => {
  try {
    const response = await api.post('/transactions', createTransactionPayload(transaction));
    return normalizeTransactionsList(response.data);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Не удалось добавить расход'));
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await api.delete(`/transactions/${id}`);
    return normalizeTransactionsList(response.data);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Не удалось удалить расход'));
  }
};

export const getTransactionsByDateRange = async ({ start, end }) => {
  try {
    const response = await api.post('/transactions/period', {
      start: toApiDate(start),
      end: toApiDate(end),
    });

    return normalizeTransactionsList(response.data) ?? [];
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Не удалось загрузить расходы за период'));
  }
};
