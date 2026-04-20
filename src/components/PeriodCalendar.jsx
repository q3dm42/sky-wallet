import { CATEGORY_OPTIONS } from '../data/categoryOptions';

function PeriodCalendar() {
  return (
    <div className="card calendar-card">
      <div className="card-header">
        <h2>Период</h2>
      </div>
      <div className="calendar-content">
        <div className="calendar-row">
          <label>
            Начальная дата
            <input name="start" type="date" />
          </label>
          <label>
            Конечная дата
            <input name="end" type="date" />
          </label>
        </div>
        <div className="calendar-hint">
          Выберите период для анализа. Доступны даты последних расходов.
        </div>
        <div className="calendar-footer">
          {CATEGORY_OPTIONS.map((option) => (
            <span key={option.value} className="calendar-pill">
              {option.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PeriodCalendar;
