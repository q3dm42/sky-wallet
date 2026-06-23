export function formatCurrency(number) {
  return `${Number(number).toLocaleString('ru-RU')} ₽`;
}

function parseDate(value) {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  return new Date(value);
}

export function formatDate(value) {
  const date = parseDate(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function formatDateRange(start, end) {
  if (!start || !end) {
    return '';
  }
  return `${start} — ${end}`;
}
