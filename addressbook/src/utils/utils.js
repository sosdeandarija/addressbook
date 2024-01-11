export function comparePrim(value, query) {
  const lowQuery = query.toLowerCase();
  return `${value}`.toLowerCase().includes(lowQuery);
}
