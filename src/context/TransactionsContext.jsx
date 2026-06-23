import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  addTransaction as addTransactionRequest,
  deleteTransaction as deleteTransactionRequest,
  getTransactions,
} from '../api/transactionsApi';
import { useAuth } from '../hooks/useAuth';

const TransactionsContext = createContext(null);

export function TransactionsProvider({ children }) {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const refreshTransactions = useCallback(async (options = {}) => {
    if (!token) {
      setTransactions([]);
      setIsLoading(false);
      setError('');
      return [];
    }

    try {
      setIsLoading(true);
      setError('');

      const data = await getTransactions({ sortBy: 'date', ...options });
      setTransactions(Array.isArray(data) ? data : []);
      return data;
    } catch (apiError) {
      setError(apiError.message || 'Не удалось загрузить список расходов');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refreshTransactions();
  }, [refreshTransactions]);

  const applyServerTransactions = useCallback((responseData) => {
    if (Array.isArray(responseData)) {
      setTransactions(responseData);
      return responseData;
    }

    return refreshTransactions();
  }, [refreshTransactions]);

  const createTransaction = useCallback(
    async (payload) => {
      try {
        setError('');
        const response = await addTransactionRequest(payload);
        return applyServerTransactions(response);
      } catch (apiError) {
        setError(apiError.message || 'Не удалось добавить расход');
        throw apiError;
      }
    },
    [applyServerTransactions]
  );

  const removeTransaction = useCallback(
    async (id) => {
      try {
        setError('');
        const response = await deleteTransactionRequest(id);
        return applyServerTransactions(response);
      } catch (apiError) {
        setError(apiError.message || 'Не удалось удалить расход');
        throw apiError;
      }
    },
    [applyServerTransactions]
  );

  const value = useMemo(
    () => ({
      transactions,
      isLoading,
      error,
      createTransaction,
      removeTransaction,
    }),
    [transactions, isLoading, error, createTransaction, removeTransaction]
  );

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error('useTransactions must be used inside TransactionsProvider');
  }

  return context;
}
