import useSWR, { SWRConfiguration } from "swr";
import { Presente } from "../_types/presentes";

/**
 *
 * Função para buscar os dados do end-point desejada
 * @param url string de endpoint para acesso
 * @return dados do fetch ate a api, se der error e estado de carregamento. (data, error, isLoading)
 *
 */

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Erro ao buscar os dados");
    return res.json();
  });

const defaultOptions: SWRConfiguration = {
  revalidateOnFocus: false,
};

export function usePresenteData(path: string, swroptions = defaultOptions) {
  const { data, error, isLoading } = useSWR<Presente>(
    path,
    fetcher,
    swroptions
  );
  return {
    data,
    error,
    isLoading,
  };
}
