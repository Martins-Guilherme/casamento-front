"use client";

import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function EnviarConvitesPage() {
  const handleCopyLink = () => {
    const url = `${window.location.origin}/convite`;
    navigator.clipboard.writeText(url);
    toast.success("Link de convite copiado para a área de transferência!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Enviar Convites</h1>

      <p className="text-gray-700 text-ls">
        Este é o link genérico de convite. Envie-o para todos os convidados.
        Cada convidado poderá cadastrar suas informações e escolher um presente.
      </p>

      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="truncate text-sm text-gray-700">
          <code>{`${
            typeof window !== "undefined" ? window.location.origin : ""
          }/convite`}</code>
        </div>
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-md text-sm"
        >
          <Copy size={16} />
          Copiar Link
        </button>
      </div>
    </div>
  );
}
