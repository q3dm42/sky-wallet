import AppHeader from '../components/AppHeader';
import ExpenseTable from '../components/ExpenseTable';
import NewExpenseForm from '../components/NewExpenseForm';
import { mockTransactions } from '../data/mockTransactions';

function DashboardPage() {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="page-content page-content--dashboard">
        <h1 className="page-title">Мои расходы</h1>
        <div className="dashboard-grid">
          <ExpenseTable transactions={mockTransactions} />
          <NewExpenseForm />
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
