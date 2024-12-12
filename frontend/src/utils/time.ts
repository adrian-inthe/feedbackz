export function formatRelativeTime(date: Date, type: "short" | "long"): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) {
    return `${diff} sec ago`;
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} min ago`;
  } else {
    return new Intl.DateTimeFormat(
      undefined,
      type === "short"
        ? {
            dateStyle: type,
          }
        : {
            dateStyle: type,
            timeStyle: type,
          },
    ).format(date);
  }
}
