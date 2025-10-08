"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function EventoForm() {
  const [titulo, setTitulo] = useState("");
  const [date, setdate] = useState(""); // formato data BR
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  // Ao montar, tente carregar evento existente para edição
  useEffect(() => {
    async function fetchEvento() {
      try {
        fetch("/api/evento")
          .then((res) => res.json())
          .then((evento) => {
            if (evento) {
              setTitulo(evento.titulo || "");
              setLocal(evento.local || "");
              setDescricao(evento.descricao || "");
              if (evento.data) {
                setdate(evento.data ? evento.data.split("T")[0] : "");
              }
            }
          })
          .catch(() => {
            toast.error("Erro ao carregar dados do evento");
          });
      } catch (err) {
        return console.error(err);
      }
    }
    fetchEvento();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !date || !local.trim()) {
      toast.error("Título, Data e Local são obrigatórios");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/evento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, data: date, local, descricao }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Erro ao salvar evento");
      }

      toast.success("Evento salvo com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        Criar / Editar Evento
      </h2>

      <div>
        <label htmlFor="titulo" className="block mb-1 font-semibold">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          disabled={loading}
          required
        />
      </div>

      <div>
        <label htmlFor="data" className="block mb-1 font-semibold">
          Data <span className="text-red-500">*</span>
        </label>
        <input
          id="data"
          type="date"
          value={date}
          onChange={(e) => setdate(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          disabled={loading}
          required
        />
      </div>

      <div>
        <label htmlFor="local" className="block mb-1 font-semibold">
          Local <span className="text-red-500">*</span>
        </label>
        <input
          id="local"
          type="text"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          disabled={loading}
          required
        />
      </div>

      <div>
        <label htmlFor="descricao" className="block mb-1 font-semibold">
          Descrição
        </label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border px-3 py-2 rounded resize-none"
          rows={4}
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#D94F5A] text-white font-semibold py-2 rounded hover:bg-[#b64146] transition"
      >
        {loading ? "Salvando..." : "Salvar Evento"}
      </button>
    </form>
  );
}
