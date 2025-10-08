"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { toast } from "sonner";

type Convidado = {
  id: number;
  nome: string;
  email: string;
  telefone?: string | null;
  mensagem?: string | null;
  presente?: { id: number; nome: string } | null;
};

export default function ConvidadosPage() {
  const [convidados, setConvidados] = useState<Convidado[]>([]);

  const fetchConvidados = async () => {
    try {
      const res = await fetch("/api/convidados");
      const data = await res.json();
      setConvidados(data);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar convidados");
    }
  };

  useEffect(() => {
    fetchConvidados();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Convidados</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {convidados.filter((p) => p).length === 0 && (
              <p>Nenhum convidado cadastrado</p>
            )}
            {convidados.map((c) => (
              <li key={c.id} className="bg-white p-3 rounded shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{c.nome}</p>
                    <p className="text-sm text-gray-600">{c.email}</p>
                    {c.telefone && (
                      <p className="text-sm text-gray-600">Tel: {c.telefone}</p>
                    )}
                    {c.mensagem && (
                      <p className="mt-1 text-sm text-gray-700">
                        “{c.mensagem}”
                      </p>
                    )}
                  </div>
                  <div>
                    {c.presente ? (
                      <span className="text-sm text-green-700">
                        Presente: {c.presente.nome}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">
                        Sem presente
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
