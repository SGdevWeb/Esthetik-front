export function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "-"; // si c'est pas une date valide

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
