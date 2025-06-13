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

import type { ApiResponse, PaginatedResponse } from "@/types"

export const partnersStatisticsAPI = {
  list: async (): Promise<PaginatedResponse<PartnerStatistics>> =>
    Promise.resolve({
      data: mockPartnerStats,
      total: mockPartnerStats.length,
      page: 1,
      limit: mockPartnerStats.length,
      totalPages: 1,
    }),
  getById: async (id: string): Promise<ApiResponse<PartnerStatistics>> => {
    const item = mockPartnerStats.find((p) => p.id === id)
    return item
      ? { data: item, success: true }
      : { data: null as any, success: false, message: "Item not found" }
  },
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
