export interface DashboardData {
  totalPresentesSelecionados: number;
  totalConvidadosConfirmados: number;
  totalPresentesDisponiveis: number;
  totalPresentesCadastrados: number;
  presentesPopulares: { nome: string; count: number[] };
}
