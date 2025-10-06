/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import Image from "next/image";
import { cn } from "../_lib/utils";

interface PresenteCardProps {
  presente: {
    id: number;
    nome: string;
    descricao?: string;
    imagem?: string;
    disponivel?: boolean;
    reservado?: boolean;
    escolhidoPor?: string;
  };
  selecionado?: boolean;
  onSelect: (id: number) => void;
}

export default function PresenteCard({
  presente,
  selecionado,
  onSelect,
}: PresenteCardProps) {
  const isBlocked = !presente.disponivel || presente.reservado;
  return (
    <div
      onClick={() => {
        if (isBlocked) return;
        presente.disponivel && onSelect(presente.id);
      }}
      className={cn(
        "rounded-xl border p-4 shadow-md transition-all bg-white flex flex-col justify-between",
        isBlocked
          ? "opacity-60 cursor-not-allowed shadow-none"
          : "cursor-pointer shadow-md hover:shadow-lg",
        selecionado && "border-[#D94F5A] ring-2 ring-[#D94F5A]/40"
      )}
      aria-disabled={isBlocked}
      tabIndex={isBlocked ? -1 : 0}
    >
      {presente.imagem && (
        <div className="relative w-full h-32 mb-3">
          <Image
            src={presente.imagem}
            alt={presente.nome}
            fill
            className="object-contain rounded-lg"
          />
        </div>
      )}
      <div className="flex flex-col flex-grow text-center">
        <h3 className="text-[#D94F5A] font-semibold text-lg mb-1">
          {presente.nome}
        </h3>
        {presente.descricao && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {presente.descricao}
          </p>
        )}
        {presente.reservado && (
          <>
            <p className="tsxt-sm text-red-500 font-semibold mt-2">
              Já escolhido!
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Escolhido por: {presente.escolhidoPor}
            </p>
          </>
        )}
      </div>

      {/* Rodapé */}
      <div
        className={cn(
          "mt-4 text-sm font-medium text-center py-1.5 rounded-lg transition-colors",
          selecionado && !isBlocked
            ? "bg-[#D94F5A] text-white"
            : "bg-[#FFEDE6] text-[#D94F5A] hover:bg-[#FFD7CF]"
        )}
      >
        {selecionado && !isBlocked
          ? "Selecionado"
          : isBlocked
          ? "Indisponivel"
          : "Selecionar Presente"}
      </div>
    </div>
  );
}
