import { CldImage } from "next-cloudinary";
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
    data = evento?.data || "",
    local = evento?.local || "",
    descricao = evento?.descricao || "",
    imagem = evento?.imagem ||
      "https://media.istockphoto.com/id/930575164/pt/foto/small-catholic-church.webp?s=1024x1024&w=is&k=20&c=bMTuE0rBITCSslPhmVElymC5dFOUsrnKhkNtT4uuLcc=",
  } = evento;
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{titulo}</h2>
      <p className="text-gray-800 font-bold text-lg mb-2">
        Data:{" "}
        <span className="text-red-400 font-bold">{formatDateBR(data)}</span>
      </p>
      <p className="text-gray-800 font-bold text-lg mb-6">
        Local: <span className="text-red-400 font-bold">{local}</span>
      </p>
      <p className="text-grat-800 font-bold text-lg mb-6">
        Descrição: <span className="text-red-400 font-bold">{descricao}</span>
      </p>
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-200">
        {imagem ? (
          <CldImage
            width={500}
            height={400}
            src="oauuabvvtlcl9ju9nxah"
            sizes="100vw"
            alt="Descrição da imagem"
            className="object-cover"
          />
        ) : (
          <Image
            src={imagem}
            alt={descricao || "Imagem não carregada"}
            fill
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default Evento;
