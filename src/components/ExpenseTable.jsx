import { formatCurrency } from '../utils/formatters';

function ExpenseTable({ transactions }) {
  return (
    <div className="card expense-table-card">
      <div className="card-header">
        <h2>Таблица расходов</h2>
      </div>
      <div className="expense-table">
        <div className="expense-table__row expense-table__row--head">
          <div>Описание</div>
          <div>Категория</div>
          <div>Дата</div>
          <div>Сумма</div>
          <div />
        </div>
        {transactions.map((item) => (
          <div key={item.id} className="expense-table__row">
            <div>{item.description}</div>
            <div>{item.category}</div>
            <div>{item.date}</div>
            <div>{formatCurrency(item.sum)}</div>
            <button type="button" className="icon-button">
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseTable;
