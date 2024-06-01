export default function formatDate(date: Date) {
  const current = new Date();

  if (date.toDateString() === current.toDateString()) {
    return date.toLocaleTimeString(undefined, {
      minute: "numeric",
      hour: "numeric"
    });
  }

  const yesterday = new Date(current);
  yesterday.setDate(current.getDate() - 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  if (date.getFullYear() === current.getFullYear()) {
    return date.toLocaleDateString(undefined, {
      dateStyle: "short"
    });
  }
}
