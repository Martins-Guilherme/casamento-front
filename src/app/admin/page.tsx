"use client";

import { useDashboardData } from "../_hooks/userDashboardData";

import { Gift, PackageOpen, UserCheckIcon } from "lucide-react";
import Infocard from "@/app/_components/Infocard";
import BarChart from "@/app/_components/BarChart";
import { SWRConfig } from "swr";

const AdminPage = () => {
  const { data, error, isLoading } = useDashboardData("/api/admin/dashboard");

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="bg-white p-8 flex justify-center items-center text-red-300 uppercase text-shadow-2xs rounded-2xl shadow text-3xl font-bold mb-6">
          Carregando...
        </p>
      </div>
    );
  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="bg-white p-8 flex justify-center items-center text-red-400 uppercase text-shadow-2xs rounded-2xl shadow text-3xl font-bold mb-6">
          {error.message}
        </p>
      </div>
    );
  }
  if (!data)
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="bg-white p-8 flex justify-center items-center text-red-400 uppercase text-shadow-2xs rounded-2xl shadow text-3xl font-bold mb-6">
          Dados não encontrados!
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
          <SWRConfig
            value={{
              provider: () => new Map(),
            }}
          >
            <div className="grid grid-cols-1 gap-10">
              <Infocard
                title="Convidados Confirmados"
                value={data.totalConvidadosConfirmados}
                icon={<UserCheckIcon size={32} />}
              />
              <Infocard
                title="Presentes Cadastrados"
                value={data.totalPresentesCadastrados}
                icon={<Gift size={32} />}
              />
              <Infocard
                title="Presentes Disponiveis"
                value={data.totalPresentesDisponiveis}
                icon={<PackageOpen size={32} />}
              />
              <div className="flex w-full">
                <BarChart labels={labels} data={counts} />
              </div>
            </div>
          </SWRConfig>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
