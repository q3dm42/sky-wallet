import { useEffect, useMemo, useState } from 'react';
import { getTransactionsByDateRange } from '../api/transactionsApi';
import AppHeader from '../components/AppHeader';
import ExpensesChart from '../components/ExpensesChart';
import LoaderBlock from '../components/LoaderBlock';
import PeriodCalendar from '../components/PeriodCalendar';
import { useTransactions } from '../context/TransactionsContext';
import { CATEGORY_OPTIONS } from '../data/categoryOptions';
import { formatDateRange } from '../utils/formatters';

function toInputDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function AnalysisPage() {
  const today = toInputDate(new Date());
  const [range, setRange] = useState({ start: today, end: today });
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [periodError, setPeriodError] = useState('');
  const [isPeriodLoading, setIsPeriodLoading] = useState(false);
  const { transactions, isLoading, error } = useTransactions();

  useEffect(() => {
    const loadPeriodTransactions = async () => {
      if (!range.start || !range.end) {
        setFilteredTransactions([]);
        return;
      }

      try {
        setIsPeriodLoading(true);
        setPeriodError('');
        const data = await getTransactionsByDateRange(range);
        setFilteredTransactions(data);
      } catch (apiError) {
        setPeriodError(apiError.message || 'Не удалось загрузить аналитику');
      } finally {
        setIsPeriodLoading(false);
      }
    };

    loadPeriodTransactions();
  }, [range]);

  const chartData = useMemo(
    () =>
      CATEGORY_OPTIONS.map((category) => ({
        name: category.label,
        value: filteredTransactions
          .filter((item) => item.category === category.value)
          .reduce((sum, item) => sum + Number(item.sum), 0),
      })),
    [filteredTransactions]
  );

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const availableDates = useMemo(
    () => [...new Set(transactions.map((item) => toInputDate(new Date(item.date))).filter(Boolean))],
    [transactions]
  );

  const subtitle = !range.end
    ? 'Выберите конечную дату периода вторым кликом'
    : filteredTransactions.length
    ? `Расходы за период ${formatDateRange(range.start, range.end)}`
    : `За период ${formatDateRange(range.start, range.end)} расходов пока нет`;

  return (
    <div className="app-shell">
      <AppHeader />
      <main className="page-content">
        <h1 className="page-title">Анализ расходов</h1>
        {error ? <p className="form-error">{error}</p> : null}
        {periodError ? <p className="form-error">{periodError}</p> : null}
        {isLoading || isPeriodLoading ? <LoaderBlock text="Загружаем аналитику..." /> : null}
        <div className="analysis-grid">
          <PeriodCalendar
            startDate={range.start}
            endDate={range.end}
            onRangeChange={setRange}
            availableDates={availableDates}
            disabled={isPeriodLoading}
          />
          <ExpensesChart
            data={chartData}
            total={total}
            subtitle={subtitle}
          />
        </div>
      </main>
    </div>
  );
}

export default AnalysisPage;
