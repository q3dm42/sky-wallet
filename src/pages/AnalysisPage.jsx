import AppHeader from '../components/AppHeader';
import ExpensesChart from '../components/ExpensesChart';
import PeriodCalendar from '../components/PeriodCalendar';

function AnalysisPage() {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="page-content">
        <h1 className="page-title">Анализ расходов</h1>
        <div className="analysis-grid">
          <PeriodCalendar />
          <ExpensesChart
            data={[]}
            total={0}
            subtitle="Выберите период для анализа"
          />
        </div>
      </main>
    </div>
  );
}

export default AnalysisPage;
