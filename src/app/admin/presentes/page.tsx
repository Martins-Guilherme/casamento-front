/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
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
  descricao?: string | null;
  imagem?: string | null;
  reservado?: number | null;
};

export default function AdminPresentsPage() {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState(""); // caso queira colar URL
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

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

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }
    setLoading(true);
    try {
      let created;
      if (file) {
        // upload multipart -> /api/presentes/upload
        const fd = new FormData();
        fd.append("nome", nome);
        fd.append("descricao", descricao);
        fd.append("imagem", file);
        const res = await fetch("/api/presentes/upload", {
          method: "POST",
          body: fd,
        });
        if (!res.ok) throw new Error("Erro upload");
        created = await res.json();
      } else {
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
        created = await res.json();
      }

      toast.success("Presente adicionado!");
      setNome("");
      setDescricao("");
      setImagemUrl("");
      setFile(null);
      fetchPresentes();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao adicionar presente");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover este presente?")) return;
    try {
      const res = await fetch(`/api/presentes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");
      toast.success("Presente removido");
      fetchPresentes();
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
                {loading ? "Carregando..." : "Adicionar"}
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
            {presentes.map((p) => (
              <div key={p.id} className="bg-white rounded-lg shadow p-3">
                {p.imagem ? (
                  // imagem local em /public/presentes/... ou url externa
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
                    className="px-3 py-1 rounded bg-red-600 text-white text-sm"
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
