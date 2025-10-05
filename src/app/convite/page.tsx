/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import PresenteCard from "../_components/PresenteCard";
import FormCadastroConvidado from "../_components/FormCadastroConvidado";
import router from "next/router";

export default function ConvitePage() {
  const [presentes, setPresentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [presenteSelecionado, setPresenteSelecionado] = useState<number | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("convite_token");
    if (token) {
      router.push(`/convite/${token}`);
    }
  }, []);

  useEffect(() => {
    async function fetchPresentes() {
      try {
        const res = await fetch("/api/presentes");
        const data = await res.json();
        setPresentes(data);
      } catch {
        setErro("Erro ao buscar presentes.");
      } finally {
        setLoading(false);
      }
    }
    fetchPresentes();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Carregando presentes...</p>;
  if (erro) return <p className="text-center text-red-600 mt-10">{erro}</p>;

  return (
    <div className="min-h-screen bg-[#FFEDE6] py-8 px-4">
      {/* Header do convite */}
      <div className="max-w-xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-serif font-bold text-[#D94F5A]">
          Maria & João
        </h1>
        <p className="text-[#A37C6B] mt-2">
          Convidam você para celebrar o nosso casamento
        </p>
      </div>

      {/* Data e Local */}
      <div className="max-w-xl mx-auto bg-white rounded-lg p-6 mb-8 shadow">
        <h2 className="text-[#D94F5A] font-semibold mb-2 text-center">
          ALGUM DIA DESSE ANO
        </h2>
        <p className="text-center text-gray-700 mb-1">Igreja eu não sei</p>
        <p className="text-center text-gray-700 mb-1">
          Rua em algum canto, 123 - Centro
        </p>
        <p className="text-center text-gray-700">⏰ alguma hora</p>
      </div>

      {/* Lista de presentes */}
      <div className="max-w-3xl mx-auto mb-8 rounded-lg bg-white p-6 shadow">
        <h2 className="text-center text-[#D94F5A] font-semibold text-xl mb-4">
          🎁 Lista de Presentes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {presentes.map((p: any) => (
            <PresenteCard
              key={p.id}
              presente={p}
              selecionado={presenteSelecionado === p.id}
              onSelect={setPresenteSelecionado}
            />
          ))}
        </div>
      </div>

      {/* Formulário */}
      {presenteSelecionado && (
        <div className="max-w-xl mx-auto bg-white rounded-lg p-6 shadow">
          <h3 className="text-[#D94F5A] font-semibold mb-4 text-center">
            Confirme sua Presença e Presente
          </h3>
          <FormCadastroConvidado
            presenteId={presenteSelecionado}
            onSuccess={(token) => {
              window.location.href = `/convite/${token}`;
            }}
          />
        </div>
      )}
    </div>
  );
}
