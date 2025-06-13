// import { fetchProtected } from "@/lib/utils"
import type { ApiResponse, PaginatedResponse } from "@/types"

export type Partner = {
  id: string
  system_id: string
  username: string
  active: boolean | string
  ip_address: string
  description: string
  created: string
  modified: string
  created_by: string
  updated_by: string
}

const mockPartners: Partner[] = [
  {
    id: "1",
    system_id: "sys_001",
    username: "partner_1",
    active: true,
    ip_address: "127.0.0.1",
    description: "Mock partner",
    created: "2024-01-01",
    modified: "2024-01-02",
    created_by: "admin",
    updated_by: "admin",
  },
]

export const partnersAPI = {
  list: async (): Promise<PaginatedResponse<Partner>> =>
    Promise.resolve({
      data: mockPartners,
      total: mockPartners.length,
      page: 1,
      limit: mockPartners.length,
      totalPages: 1,
    }),
  getById: async (id: string): Promise<ApiResponse<Partner>> => {
    const item = mockPartners.find((p) => p.id === id)
    return item
      ? { data: item, success: true }
      : { data: null as any, success: false, message: "Item not found" }
  },
  create: async (_data: Partial<Partner>) => Promise.resolve({ status: 200 }),
  update: async (_id: string, _data: Partial<Partner>) =>
    Promise.resolve({ status: 200 }),
}

/*
export const partnersAPI = {
  list: () => fetchProtected(`/admin/main/partnermodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/partnermodel/${id}/`),
  create: (data: Partial<Partner>) =>
    fetchProtected(`/admin/main/partnermodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Partner>) =>
    fetchProtected(`/admin/main/partnermodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
*/
