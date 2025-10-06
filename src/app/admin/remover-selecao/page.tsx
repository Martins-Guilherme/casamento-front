/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { toast } from "sonner";
import Image from "next/image";

type Presente = {
  id: number;
  nome: string;
  imagem?: string | null;
  reservado?: number | null;
};

export default function RemoveSelectionPage() {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPresentes = async () => {
    try {
      const res = await fetch("/api/presentes");
      const data = await res.json();
      setPresentes(data);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar presentes");
    }
  };

  useEffect(() => {
    fetchPresentes();
  }, []);

  const handleRemove = async (id: number) => {
    if (!confirm("Remover vínculo desse presente?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/presentes/remover-selecao/${id}`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Erro");
      toast.success("Seleção removida");
      fetchPresentes();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao remover seleção");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Presentes Selecionados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {presentes.filter((p) => p.reservado).length === 0 && (
              <p>Nenhum presente selecionado</p>
            )}
            {presentes
              .filter((p) => p.reservado)
              .map((p) => (
                <div key={p.id} className="bg-white rounded shadow p-3">
                  {p.imagem ? (
                    <Image
                      src={p.imagem}
                      className="w-full h-32 object-cover rounded mb-2"
                      alt={p.nome}
                      width={150}
                      height={150}
                    />
                  ) : null}
                  <h3 className="font-semibold">{p.nome}</h3>
                  <div className="mt-2">
                    <Button
                      onClick={() => handleRemove(p.id)}
                      className="bg-amber-600 text-white"
                    >
                      Remover Seleção
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
