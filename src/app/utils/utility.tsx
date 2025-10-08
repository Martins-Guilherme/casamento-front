export function formatDateBR(isoDate?: string) {
  if (!isoDate) return "";
  try {
    return new Date(isoDate).toLocaleDateString("pt-BR");
  } catch {
    return isoDate;
  }
}
