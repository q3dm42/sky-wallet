import AppHeader from '../components/AppHeader';
import ExpenseTable from '../components/ExpenseTable';
import LoaderBlock from '../components/LoaderBlock';
import NewExpenseForm from '../components/NewExpenseForm';
import { useTransactions } from '../context/TransactionsContext';

function DashboardPage() {
  const { transactions, isLoading, error, createTransaction, removeTransaction } = useTransactions();

  return (
    <div className="app-shell">
      <AppHeader />
      <main className="page-content page-content--dashboard">
        <h1 className="page-title">Мои расходы</h1>
        {error ? <p className="form-error">{error}</p> : null}
        {isLoading ? <LoaderBlock text="Загружаем список расходов..." /> : null}
        <div className="dashboard-grid">
          <ExpenseTable transactions={transactions} onDelete={removeTransaction} />
          <NewExpenseForm onSubmit={createTransaction} />
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
