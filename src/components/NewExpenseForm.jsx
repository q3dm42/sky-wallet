import { useRef, useState } from 'react';
import CategoryIcon from './CategoryIcon';
import { CATEGORY_OPTIONS } from '../data/categoryOptions';
import { formatDate } from '../utils/formatters';

function NewExpenseForm() {
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleOpenCalendar = () => {
    if (typeof dateInputRef.current?.showPicker === 'function') {
      dateInputRef.current.showPicker();
      return;
    }

    dateInputRef.current?.click();
  };

  return (
    <div className="form-card card">
      <h2 className="card-title">Новый расход</h2>
      <form className="expense-form" onSubmit={handleSubmit}>
        <label>
          <span>Описание</span>
          <input name="description" placeholder="Введите описание" />
        </label>

        <fieldset className="category-fieldset">
          <legend className="field-label">Категория</legend>
          <div className="chips-grid">
            {CATEGORY_OPTIONS.map((option) => (
              <button key={option.value} type="button" className="chip">
                <CategoryIcon category={option.value} />
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <label>
          <span>Дата</span>
          <span className="date-field">
            <input
              value={date ? formatDate(date) : ''}
              readOnly
              placeholder="Введите дату"
              onClick={handleOpenCalendar}
            />
            <input
              ref={dateInputRef}
              className="date-field__native"
              name="date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              tabIndex={-1}
            />
          </span>
        </label>

        <label>
          <span>Сумма</span>
          <input name="sum" placeholder="Введите сумму" />
        </label>

        <button type="submit" className="primary-button">
          Добавить новый расход
        </button>
      </form>
    </div>
  );
}

export default NewExpenseForm;
