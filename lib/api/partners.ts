// import { fetchProtected } from "@/lib/utils"

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
  list: async () => Promise.resolve(mockPartners),
  getById: async (id: string) =>
    Promise.resolve(mockPartners.find((p) => p.id === id) || ({} as Partner)),
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
