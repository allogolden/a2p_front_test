import { fetchProtected } from "@/lib/utils"

export type PartnerStatistics = {
  id: string
  partner: string
  messages_sent: string
  success_rate: string
  revenue: string
}

export const partnersStatisticsAPI = {
  list: () => fetchProtected(`/admin/main/partnersstatisticsmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/partnersstatisticsmodel/${id}/`)
}
