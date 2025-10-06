import { useEffect, useState } from "react";
import { toast } from "sonner";

import Image from "next/image";

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
      } finally {
        toast.success("Uhuu");
      }
    }
    showEvent();
  }, []);

  const { titulo, data, local, descricao, imagem } = evento;
  console.log(evento);
  return (
    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{titulo}</h2>
      <p className="text-gray-700 text-lg mb-2">Data: {data}</p>
      <p className="text-gray-700 text-lg mb-2">Hora:XX:YY</p>
      <p className="text-gray-700 text-lg mb-6">Local:{local}</p>
      <div className="relative w-full h-56 rounded-lg overflow-hidden border border-gray-200">
        <Image
          src={
            imagem ||
            "https://media.istockphoto.com/id/930575164/pt/foto/small-catholic-church.webp?s=1024x1024&w=is&k=20&c=bMTuE0rBITCSslPhmVElymC5dFOUsrnKhkNtT4uuLcc="
          }
          alt={descricao || "Imagem não carregada"}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Evento;
