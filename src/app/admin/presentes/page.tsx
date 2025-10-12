"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { usePresenteData } from "@/app/_hooks/usePresents";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

export default function AdminPresentsPage() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState(""); // caso queira colar URL
  const {
    data: presentes,
    error,
    isLoading,
  } = usePresenteData("/api/presentes");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }
    isLoading;
    try {
      // cria com URL (ou sem imagem)
      const res = await fetch("/api/presentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, descricao, imagem: imagemUrl || null }),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.error || "Erro ao criar");
      }

      toast.success("Presente adicionado!");
      setNome("");
      setDescricao("");
      setImagemUrl("");
      mutate("/api/presentes");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao adicionar presente");
    } finally {
      isLoading;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover este presente?")) return;
    try {
      const res = await fetch(`/api/presentes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");
      toast.success("Presente removido");
      mutate("/api/presentes");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao remover presente");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Presente</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-3">
            <Input
              placeholder="Nome do presente"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Textarea
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="URL da imagem (opcional)"
                  value={imagemUrl}
                  onChange={(e) => setImagemUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" className="px-4">
                {isLoading ? "Carregando..." : "Adicionar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Presentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {presentes?.map((p: any) => (
              <div key={p.id} className="bg-white rounded-lg shadow p-3">
                {p.imagem ? (
                  <Image
                    src={p.imagem}
                    alt={p.nome}
                    className="w-full h-40 object-cover rounded mb-2"
                    width={150}
                    height={150}
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400 mb-2">
                    Sem imagem
                  </div>
                )}

                <h3 className="font-semibold">{p.nome}</h3>
                <p className="text-sm text-gray-600">{p.descricao}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 rounded bg-red-600 cursor-pointer text-white text-sm"
                  >
                    Remover
                  </button>
                  {p.reservado ? (
                    <span className="ml-auto text-sm text-amber-700">
                      Reservado
                    </span>
                  ) : (
                    <span className="ml-auto text-sm text-green-600">
                      Disponível
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
