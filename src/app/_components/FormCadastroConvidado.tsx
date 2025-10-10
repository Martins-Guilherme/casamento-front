"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormCadastroConvidadoProps {
  presenteId: number;
  onSuccess: (token: string) => void;
  onError: (msg: string) => void;
}

interface FormData {
  nome: string;
  email: string;
  telefone?: string;
  mensagem?: string;
  presenteId?: number;
}

export default function FormCadastroConvidado({
  presenteId,
  onSuccess,
  onError,
}: FormCadastroConvidadoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const [erro, setError] = useState("");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/convites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, presenteId }),
      });
      const result = await res.json();

      // Caso de erro tratado
      if (!res.ok) {
        const mensagemErro =
          result?.error === "PRESENTE_JA_ESCOLHIDO"
            ? "Ops! Esse presente já foi escolhido 💝"
            : result?.error || "Erro ao enviar formulário";
        setError(mensagemErro);
        onError(mensagemErro);
        setLoading(false);
        return;
      }

      // Sucesso
      onSuccess(result.token);
    } catch (error) {
      console.error(error);
      const msg = "Erro inesperado ao enviar formulário";
      setError(msg);
      onError(msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-gray-700">
      {erro && <p className="text-red-600">{erro}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Nome Completo<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("nome", { required: "Nome é obrigatório" })}
          className="w-full border p-2 rounded-lg border-gray-300 focus:border-[#D94F5A] focus:ring-[#D94F5A]"
        />
        {errors.nome && <p className="text-red-600">{errors.nome.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email inválido",
            },
          })}
          className="w-full border p-2 rounded-lg border-gray-300 focus:border-[#D94F5A] focus:ring-[#D94F5A]"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Telefone
        </label>
        <input
          type="tel"
          {...register("telefone")}
          className="w-full border p-2 rounded-lg border-gray-300 focus:border-[#D94F5A] focus:ring-[#D94F5A]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Mensagem
        </label>
        <textarea
          {...register("mensagem")}
          className="w-full border p-2 rounded-lg border-gray-300 focus:border-[#D94F5A] focus:ring-[#D94F5A]"
          rows={3}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#D94F5A] cursor-pointer hover:bg-[#c04552] text-white rounded-lg py-2 font-medium shadow-md transition-all"
      >
        {loading ? "Enviando..." : "Enviar Solicitação de Presente"}
      </button>
    </form>
  );
}
