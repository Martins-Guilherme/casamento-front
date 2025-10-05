/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function ConviteTokenPage() {
  const { token } = useParams();
  const [convidado, setConvidado] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConvidado() {
      try {
        const res = await fetch(`/api/convites/${token}`);
        if (!res.ok) throw new Error("Convite não encontrado");
        const data = await res.json();
        setConvidado(data);
      } catch (error: any) {
        toast.error(error.message || "Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    }
    fetchConvidado();
  }, [token]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Carregando seu convite...
      </div>
    );

  if (!convidado)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-lg font-medium text-red-500">
          Convite inválido ou já utilizado.
        </p>
      </div>
    );

  const { nome, email, presente } = convidado;

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 text-center">
          <h1 className="text-2xl font-semibold mb-2">
            Olá, {nome.split(" ")[0]}! 🎉
          </h1>
          <p className="text-gray-600 mb-6">
            Obrigado por confirmar sua presença e escolher um presente!
          </p>

          {presente && (
            <div className="space-y-3">
              <Image
                src={presente.imagem}
                alt={presente.nome}
                width={400}
                height={250}
                className="w-full h-56 object-cover rounded-lg border border-gray-200"
              />
              <h2 className="text-xl font-medium">{presente.nome}</h2>
              <p className="text-gray-500 text-sm">{presente.descricao}</p>
            </div>
          )}

          <div className="mt-8">
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
              ✅ Presente Confirmado
            </span>
          </div>

          <p className="mt-6 text-sm text-gray-400">{email}</p>
        </div>
      </div>

      {/* 💒 Coluna direita: informações do casamento */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-center text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Detalhes do Casamento 💍
        </h2>
        <p className="text-gray-700 text-lg mb-2">
          <strong>Data:</strong> 15 de Novembro de 2025
        </p>
        <p className="text-gray-700 text-lg mb-2">
          <strong>Hora:</strong> 17h00
        </p>
        <p className="text-gray-700 text-lg mb-6">
          <strong>Local:</strong> Espaço Jardim das Oliveiras, Rio de Janeiro
        </p>

        <div className="relative w-full h-56 rounded-lg overflow-hidden border border-gray-200">
          <Image
            src="https://images.unsplash.com/photo-1529634895259-6c3c6aa1b2e0"
            alt="Local do casamento"
            fill
            className="object-cover"
          />
        </div>

        <p className="text-gray-600 text-sm mt-4">
          “Será um prazer imenso celebrar este dia com você 💖”
        </p>
      </div>
    </div>
  );
}
