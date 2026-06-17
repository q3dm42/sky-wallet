import { CATEGORY_OPTIONS } from '../data/categoryOptions';
import { formatCurrency, formatDate } from '../utils/formatters';

const categoryLabels = CATEGORY_OPTIONS.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

function ExpenseTable({ transactions, onDelete }) {
  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Удалить эту транзакцию?');

    if (isConfirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="table-card card">
      <h2 className="card-title">Таблица расходов</h2>
      <div className="table-wrap">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Описание</th>
              <th>Категория</th>
              <th>Дата</th>
              <th>Сумма</th>
              <th aria-label="Действия"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.length ? (
              transactions.map((item) => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{categoryLabels[item.category] ?? item.category}</td>
                  <td>{formatDate(item.date)}</td>
                  <td>{formatCurrency(item.sum)}</td>
                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                      aria-label={`Удалить расход ${item.description}`}
                      title="Удалить транзакцию"
                    >
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M6 2h4l.5 1H13v1.5H3V3h2.5L6 2Zm-1.8 4h9.6l-.7 8H4.9l-.7-8Zm2.3 1.4.3 5h1.1l-.3-5H6.5Zm2.9 0-.3 5h1.1l.3-5H9.4Z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="table-empty">
                  Расходов пока нет. Добавьте первую транзакцию справа.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseTable;
