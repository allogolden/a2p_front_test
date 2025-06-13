// import { fetchProtected } from "@/lib/utils"

export type PartnerStatistics = {
  id: string
  partner: string
  messages_sent: string
  success_rate: string
  revenue: string
}

const mockPartnerStats: PartnerStatistics[] = [
  {
    id: "1",
    partner: "partner_1",
    messages_sent: "100",
    success_rate: "99%",
    revenue: "10",
  },
]

export const partnersStatisticsAPI = {
  list: async () => Promise.resolve(mockPartnerStats),
  getById: async (id: string) =>
    Promise.resolve(
      mockPartnerStats.find((p) => p.id === id) || ({} as PartnerStatistics)
    ),
  create: async (_data: Partial<PartnerStatistics>) =>
    Promise.resolve({ status: 200 }),
  update: async (_id: string, _data: Partial<PartnerStatistics>) =>
    Promise.resolve({ status: 200 }),
}

/*
export const partnersStatisticsAPI = {
  list: () => fetchProtected(`/admin/main/partnersstatisticsmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/partnersstatisticsmodel/${id}/`)
}
*/
