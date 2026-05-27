import { useRef, useState } from 'react';
import CategoryIcon from './CategoryIcon';
import { CATEGORY_OPTIONS } from '../data/categoryOptions';
import { formatDate } from '../utils/formatters';

function toInputDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function PeriodCalendar() {
  const today = toInputDate(new Date());
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const startInputRef = useRef(null);
  const endInputRef = useRef(null);

  const openCalendar = (inputRef) => {
    if (typeof inputRef.current?.showPicker === 'function') {
      inputRef.current.showPicker();
      return;
    }

    inputRef.current?.click();
  };

  return (
    <aside className="period-card card">
      <h2 className="card-title">Период</h2>
      <div className="calendar-content">
        <div className="calendar-row">
          <label>
            Начальная дата
            <span className="date-field">
              <input
                value={formatDate(startDate)}
                readOnly
                onClick={() => openCalendar(startInputRef)}
              />
              <input
                ref={startInputRef}
                className="date-field__native"
                name="start"
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                tabIndex={-1}
              />
            </span>
          </label>
          <label>
            Конечная дата
            <span className="date-field">
              <input
                value={formatDate(endDate)}
                readOnly
                onClick={() => openCalendar(endInputRef)}
              />
              <input
                ref={endInputRef}
                className="date-field__native"
                name="end"
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                tabIndex={-1}
              />
            </span>
          </label>
        </div>
        <div className="calendar-hint">
          Выберите период для анализа. Доступны даты последних расходов.
        </div>
        <div className="calendar-footer">
          {CATEGORY_OPTIONS.map((option) => (
            <span key={option.value} className="calendar-pill">
              <CategoryIcon category={option.value} />
              {option.label}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default PeriodCalendar;
