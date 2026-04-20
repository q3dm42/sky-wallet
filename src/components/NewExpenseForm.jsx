import { CATEGORY_OPTIONS } from '../data/categoryOptions';

function NewExpenseForm() {
  return (
    <div className="card expense-form-card">
      <div className="card-header">
        <h2>Новый расход</h2>
      </div>
      <form className="expense-form">
        <label>
          <span>Описание</span>
          <input name="description" placeholder="Введите описание" />
        </label>
        <fieldset className="category-fieldset">
          <legend>Категория</legend>
          <div className="category-grid">
            {CATEGORY_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className="category-chip"
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
        <label>
          <span>Дата</span>
          <input name="date" type="date" />
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
