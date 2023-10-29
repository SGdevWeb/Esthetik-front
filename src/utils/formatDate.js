export function formatDate(dateString) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat("fr-FR", options).format(new Date(dateString));
}
