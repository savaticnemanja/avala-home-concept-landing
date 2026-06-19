// Pick a per-locale field from a DB row, falling back to Serbian then empty.
// e.g. pick(project, 'title', 'en') -> project.titleEn || project.titleSr.
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const pick = (row, base, locale) => {
  if (!row) return '';
  const val = row[`${base}${cap(locale)}`];
  if (val) return val;
  return row[`${base}Sr`] ?? '';
};
