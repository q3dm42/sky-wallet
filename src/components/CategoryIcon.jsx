import { getCategoryOption } from '../data/categoryOptions';

function CategoryIcon({ category }) {
  const option = getCategoryOption(category);

  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d={option.icon} />
    </svg>
  );
}

export default CategoryIcon;
