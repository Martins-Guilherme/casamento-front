import { useEffect, useState } from "react";
import { toast } from "sonner";

import Image from "next/image";
import { formatDateBR } from "../utils/utility";

const Evento = () => {
  const [evento, setEvento] = useState<any>([]);

  useEffect(() => {
    async function showEvent() {
      try {
        const evento = await fetch("/api/evento");
        if (!evento) throw new Error("Evento não encontrado");
        const data = await evento.json();
        setEvento(data);
      } catch (error: any) {
        toast.error(error.message || "Erro ao carregar dados");
      }
    }
    showEvent();
  }, []);

  const {
    titulo = evento?.titulo || "",
    data = evento?.evento || "",
    local = evento?.local || "",
    descricao = evento?.descricao || "",
    imagem = evento?.imagem ||
      "https://media.istockphoto.com/id/930575164/pt/foto/small-catholic-church.webp?s=1024x1024&w=is&k=20&c=bMTuE0rBITCSslPhmVElymC5dFOUsrnKhkNtT4uuLcc=",
  } = evento;
  return (
    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{titulo}</h2>
      <p className="text-gray-700 text-lg mb-2">
        Data:{" "}
        <span className="text-gray-500 font-bold">{formatDateBR(data)}</span>
      </p>
      <p className="text-gray-700 text-lg mb-6">
        Local: <span className="text-gray-500 font-bold">{local}</span>
      </p>
      <div className="relative w-full h-56 rounded-lg overflow-hidden border border-gray-200">
        <Image
          src={imagem}
          alt={descricao || "Imagem não carregada"}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Evento;
