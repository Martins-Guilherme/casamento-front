"use client";
import React, { useEffect } from "react";
import PresenteCard from "../_components/PresenteCard";
import FormCadastroConvidado from "../_components/FormCadastroConvidado";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePresenteData } from "../_hooks/usePresents";
import { mutate } from "swr";

export default function ConvitePage() {
  const {
    data: presentes,
    error: erro,
    isLoading: loading,
  } = usePresenteData("/api/presentes");
  const [presenteSelecionado, setPresenteSelecionado] = React.useState<
    number | null
  >(null);
  const router = useRouter();

  // Verifica se o usuário já tem token salvo
  useEffect(() => {
    const token = localStorage.getItem("convite_token");
    if (token) {
      router.push(`/convite/${token}`);
    } else {
      router.push("/convite/");
    }
  }, [router]);

  // Atualiza o estado quando o presente é escolhido
  const handlePresenteSelecionado = (id: number) => {
    const presente = presentes?.find((p: any) => p.id === id);

    if (presente && !presente.disponivel) {
      toast.error("Ops! Esse presente já foi escolhido 💝");
      // SWR revalidar cache
      mutate("/api/presentes");
    } else {
      setPresenteSelecionado(id);
    }
  };

  // Recarregar a lista se o cadastro apresentar alguma falha
  const handleCadastroErro = (msg: string) => {
    toast.error(msg);
    mutate("/api/presentes");
    setPresenteSelecionado(null);
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">Carregando presentes...</p>
    );
  if (erro) {
    console.error("Error em SWR: ", erro);
    return (
      <p className="text-center text-red-600 mt-10">
        {erro?.message ??
          "Erro ao buscar presentes, tente novamente mais tarde."}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFEDE6] py-8 px-4 flex flex-col items-center justify-center">
      {/* Header do convite */}
      <div className="max-w-l w-full mx-auto bg-white rounded-3xl shadow-lg p-8 border border-[#FCDCE6] text-center mb-8">
        <h1 className="text-center font-serif text-4xl font-bold text-[#D94F5A] mb-3 tracking-wide">
          José Tiago & Ana Beatriz
        </h1>
        <p className="text-center text-[#A37C6B] mb-2 font-light text-lg">
          Convidam você para celebrar o nosso casamento
        </p>
      </div>

      {/* Lista de presentes */}
      <div className="max-w-3xl mx-auto mb-8 rounded-lg bg-white p-6 shadow">
        <h2 className="text-center text-[#D94F5A] font-semibold text-xl mb-4">
          🎁 Lista de Presentes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {presentes?.map((p: any) => (
            <PresenteCard
              key={p.id}
              presente={p}
              selecionado={presenteSelecionado === p.id}
              onSelect={handlePresenteSelecionado}
            />
          ))}
        </div>
      </div>

      {/* Formulário */}
      {presenteSelecionado && (
        <div className="max-w-screen  bg-white rounded-lg p-6 shadow">
          <h3 className="text-[#D94F5A] font-semibold mb-4 text-center">
            Confirme sua Presença e Presente
          </h3>
          <FormCadastroConvidado
            presenteId={presenteSelecionado}
            onError={handleCadastroErro}
            onSuccess={(token) => {
              localStorage.setItem("convite_token", token);
              window.location.href = `/convite/${token}`;
            }}
          />
        </div>
      )}
    </div>
  );
}
