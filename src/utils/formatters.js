export function formatCurrency(number) {
  return `${Number(number).toLocaleString('ru-RU')} ₽`;
}

export function formatDateRange(start, end) {
  if (!start || !end) {
    return '';
  }
  return `${start} — ${end}`;
}
