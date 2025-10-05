"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Copy } from "lucide-react";

const ConvidadoSchema = z.object({
  id: z.string(),
  nome: z.string(),
  email: z.string(),
  token: z.string().optional(),
});

export default function EnviarConvitesPage() {
  const [convidados, setConvidados] = useState<
    z.infer<typeof ConvidadoSchema>[]
  >([]);

  useEffect(() => {
    async function fetchConvidados() {
      const res = await fetch("/api/convidados");
      const data = await res.json();
      setConvidados(data);
    }
    fetchConvidados();
  }, []);

  const handleCopyLink = (token: string) => {
    const url = `${window.location.origin}/presentes/escolher-com-token?token=${token}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copiado para a área de transferência!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Enviar Convites</h1>
      <p className="text-gray-600 text-sm">
        Copie o link de convite e envie para cada convidado. O link é único.
      </p>

      <div className="grid gap-3">
        {convidados.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
          >
            <div>
              <p className="font-semibold">{c.nome}</p>
              <p className="text-sm text-gray-600">{c.email}</p>
            </div>
            {c.token ? (
              <button
                onClick={() => handleCopyLink(c.token || "")}
                className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-md text-sm"
              >
                <Copy size={16} />
                Copiar Link
              </button>
            ) : (
              <p className="text-red-500 text-sm">Sem token</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
