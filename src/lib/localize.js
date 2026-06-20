const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const pick = (row, base, locale) => {
  if (!row) return '';
  const val = row[`${base}${cap(locale)}`];
  if (val) return val;
  return row[`${base}Sr`] ?? '';
};
