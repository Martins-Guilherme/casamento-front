export function formatDateBR(isoDate?: string) {
  if (!isoDate) return "";
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  } catch {
    return isoDate;
  }
}
