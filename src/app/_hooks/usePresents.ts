import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Erro ao buscar a lista de presentes!");
    return res.json();
  });

export function usePresentes() {
  const { data, error, isLoading } = useSWR("/api/presentes", fetcher);

  return {
    presentes: data,
    erro: error,
    loading: isLoading,
  };
}
