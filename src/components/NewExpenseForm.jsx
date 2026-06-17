import { useRef, useState } from 'react';
import CategoryIcon from './CategoryIcon';
import { CATEGORY_OPTIONS } from '../data/categoryOptions';
import { formatDate } from '../utils/formatters';
import { validateTransaction } from '../utils/validators';

const initialFormData = {
  description: '',
  category: 'food',
  date: '',
  sum: '',
};

function NewExpenseForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dateInputRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      setFormData(initialFormData);
    } catch (apiError) {
      setError(apiError.message || 'Не удалось сохранить расход');
    } finally {
      setIsSubmitting(false);
    }
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
          <span className="date-field">
            <input
              value={formData.date ? formatDate(formData.date) : ''}
              readOnly
              placeholder="Введите дату"
              onClick={handleOpenCalendar}
              disabled={isSubmitting}
            />
            <input
              ref={dateInputRef}
              className="date-field__native"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              tabIndex={-1}
              disabled={isSubmitting}
            />
          </span>
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
