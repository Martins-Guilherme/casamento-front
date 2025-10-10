import useSWR from "swr";
import { DashboardData } from "../_types/dashboard";

/**
 *
 * Função para buscar os dados do end-point desejada
 * @param url string de endpoint para acesso
 * @return dados do fetch ate a api, se der error e estado de carregamento. (data, error, isLoading)
 *
 */

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Erro ao buscar os dados do Dashboard");
    return res.json();
  });

export function useDashboardData() {
  const { data, error, isLoading } = useSWR<DashboardData>(
    "/api/admin/dashboard",
    fetcher
  );
  return {
    data,
    error,
    isLoading,
  };
}
