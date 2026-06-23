import { useEffect, useMemo, useRef, useState } from 'react';
import CategoryIcon from './CategoryIcon';
import { CATEGORY_OPTIONS } from '../data/categoryOptions';
import { toInputDate } from '../api/helpers';
import { formatDate } from '../utils/formatters';
import { validateTransaction } from '../utils/validators';

const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const monthFormatter = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' });

function createInitialFormData() {
  return {
    description: '',
    category: 'food',
    date: toInputDate(new Date()),
    sum: '',
  };
}

function parseInputDate(value) {
  const [year, month, day] = value.split('-').map(Number);

  if (!year || !month || !day) {
    return new Date();
  }

  return new Date(year, month - 1, day);
}

function buildMonthDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const days = [];

  for (let index = 0; index < firstWeekday; index += 1) {
    days.push(null);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(new Date(year, month, day));
  }

  return days;
}

const isSameDay = (left, right) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const shiftMonth = (date, offset) => new Date(date.getFullYear(), date.getMonth() + offset, 1);

function DatePicker({ value, disabled, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => parseInputDate(value));
  const containerRef = useRef(null);
  const selectedDate = parseInputDate(value);
  const monthDays = useMemo(() => buildMonthDays(visibleMonth), [visibleMonth]);

  useEffect(() => {
    setVisibleMonth(parseInputDate(value));
  }, [value]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectDate = (date) => {
    onChange(toInputDate(date));
    setIsOpen(false);
  };

  return (
    <span className="date-field" ref={containerRef}>
      <button
        type="button"
        className="date-field__button"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={disabled}
      >
        {formatDate(value)}
      </button>

      {isOpen ? (
        <div className="date-picker" role="dialog" aria-label="Выбор даты расхода">
          <div className="date-picker__header">
            <button
              type="button"
              className="date-picker__nav"
              onClick={() => setVisibleMonth((prev) => shiftMonth(prev, -1))}
              aria-label="Предыдущий месяц"
            >
              ‹
            </button>
            <span>{monthFormatter.format(visibleMonth)}</span>
            <button
              type="button"
              className="date-picker__nav"
              onClick={() => setVisibleMonth((prev) => shiftMonth(prev, 1))}
              aria-label="Следующий месяц"
            >
              ›
            </button>
          </div>

          <div className="date-picker__weekdays">
            {WEEK_DAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="date-picker__grid">
            {monthDays.map((date, index) =>
              date ? (
                <button
                  key={toInputDate(date)}
                  type="button"
                  className={`date-picker__day${isSameDay(date, selectedDate) ? ' date-picker__day--selected' : ''}`}
                  onClick={() => handleSelectDate(date)}
                >
                  {date.getDate()}
                </button>
              ) : (
                <span key={`empty-${index}`} className="date-picker__empty" />
              )
            )}
          </div>
        </div>
      ) : null}
    </span>
  );
}

function NewExpenseForm({ onSubmit }) {
  const [formData, setFormData] = useState(createInitialFormData);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = validateTransaction(formData);

    if (message) {
      setError(message);
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await onSubmit({ ...formData, sum: Number(formData.sum) });
      setFormData(createInitialFormData());
    } catch (apiError) {
      setError(apiError.message || 'Не удалось сохранить расход');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-card card">
      <h2 className="card-title">Новый расход</h2>
      <form className="expense-form" onSubmit={handleSubmit}>
        <label>
          <span>Описание</span>
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Введите описание"
            disabled={isSubmitting}
          />
        </label>

        <fieldset className="category-fieldset">
          <legend className="field-label">Категория</legend>
          <div className="chips-grid">
            {CATEGORY_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`chip${formData.category === option.value ? ' chip--active' : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, category: option.value }))}
                disabled={isSubmitting}
              >
                <CategoryIcon category={option.value} />
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <label>
          <span>Дата</span>
          <DatePicker value={formData.date} onChange={handleDateChange} disabled={isSubmitting} />
        </label>

        <label>
          <span>Сумма</span>
          <input
            name="sum"
            type="number"
            min="1"
            value={formData.sum}
            onChange={handleChange}
            placeholder="Введите сумму"
            disabled={isSubmitting}
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button type="submit" className="primary-button" disabled={isSubmitting}>
          {isSubmitting ? 'Сохраняем...' : 'Добавить новый расход'}
        </button>
      </form>
    </div>
  );
}

export default NewExpenseForm;
