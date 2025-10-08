"use client";

import { useState, useEffect } from "react";

import { Gift, UserCheckIcon } from "lucide-react";
import Infocard from "@/app/_components/Infocard";
import BarChart from "@/app/_components/BarChart";

interface DashboardData {
  totalPresentesSelecionados: number;
  totalConvidadosConfirmados: number;
  totalPresentesDisponiveis: number;
  presentesPopulares: { nome: string; count: number[] };
}

const AdminPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetcheDashboardData() {
      const res = await fetch("/api/admin/dashboard");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
      setLoading(false);
    }
    fetcheDashboardData();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="bg-white p-8 flex justify-center items-center text-red-300 uppercase text-shadow-2xs rounded-2xl shadow text-3xl font-bold mb-6">
          Carregando...
        </p>
      </div>
    );
  if (!data)
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="bg-white p-8 flex justify-center items-center text-red-400 uppercase text-shadow-2xs rounded-2xl shadow text-3xl font-bold mb-6">
          Erro ao carregar os dados!
        </p>
      </div>
    );

  const labels = ["Disponíveis", "Escolhidos"];
  const counts = [
    data.totalPresentesDisponiveis,
    data.totalPresentesSelecionados,
  ];

  return (
    <div className="max-w-dvh mx-auto text-center flex flex-col items-center mb-8">
      <div className=" bg-white rounded-lg shadow p-3 overflow-hidden">
        <div className="p-6 space-y-8 flex w-fit justify-center max-w-lg items-center">
          <div className="grid grid-cols-1 gap-24">
            <Infocard
              title="Convidados Confirmados"
              value={data.totalConvidadosConfirmados}
              icon={<UserCheckIcon size={32} />}
            />
            <Infocard
              title="Presentes Cadastrados"
              value={data.totalPresentesDisponiveis}
              icon={<Gift size={32} />}
            />
            <div className="flex w-full">
              <BarChart labels={labels} data={counts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
