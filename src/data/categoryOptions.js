export const CATEGORY_OPTIONS = [
  {
    value: 'food',
    label: 'Еда',
    icon: 'M4 2h1v5H4V2Zm2 0h1v5H6V2Zm2 0h1v5H8V2ZM4 8h5l-.5 6h-4L4 8Zm8-6h1v12h-2V9.5c-.9-.4-1.5-1.5-1.5-3C9.5 4 10.6 2 12 2Z',
  },
  {
    value: 'transport',
    label: 'Транспорт',
    icon: 'M3.2 5 4.4 2.5h7.2L12.8 5 14 6.2V11h-1.2a1.8 1.8 0 0 1-3.6 0H6.8a1.8 1.8 0 0 1-3.6 0H2V6.2L3.2 5Zm1.5-.8L4.2 5h7.6l-.5-.8H4.7ZM5 10.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Zm6 0a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Z',
  },
  {
    value: 'housing',
    label: 'Жилье',
    icon: 'm2 7 6-5 6 5-1 1.2V14H9.5V9.8h-3V14H3.1V8.2L2 7Z',
  },
  {
    value: 'entertainment',
    label: 'Развлечения',
    icon: 'M4 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm1 3h6V4H5v1Zm0 3h2V6H5v2Zm4 0h2V6H9v2Zm-4 3h2V9H5v2Zm4 0h2V9H9v2Z',
  },
  {
    value: 'education',
    label: 'Образование',
    icon: 'M1.5 6 8 2.8 14.5 6 8 9.2 1.5 6Zm2.2 2 4.3 2.1L12.3 8v2.7c-1.1.9-2.5 1.4-4.3 1.4s-3.2-.5-4.3-1.4V8Z',
  },
  {
    value: 'other',
    label: 'Другое',
    icon: 'M3 3h10v10H3V3Zm3 3h4V5H6v1Zm0 2.5h4v-1H6v1Zm0 2.5h4v-1H6v1Z',
  },
];

export const DEFAULT_CATEGORY = 'other';

export const getCategoryOption = (category) =>
  CATEGORY_OPTIONS.find((option) => option.value === category) ??
  CATEGORY_OPTIONS.find((option) => option.value === DEFAULT_CATEGORY);
