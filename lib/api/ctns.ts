// import { fetchProtected } from "@/lib/utils"

export type CTN = {
  id: string
  system_id: string
  category: string
  ctn: string
  ip_address: string
  active: boolean | string // зависит от API: может быть строкой "True"/"False" или булево
  description: string
  created?: string
  modified?: string
  created_by?: string
  updated_by?: string
}

const mockCTNs: CTN[] = [
  {
    id: "1",
    system_id: "sys_001",
    category: "A",
    ctn: "12345",
    ip_address: "127.0.0.1",
    active: true,
    description: "Mock ctn",
    created: "2024-01-01",
    modified: "2024-01-02",
    created_by: "admin",
    updated_by: "admin",
  },
]

export const ctnAPI = {
  list: async () => Promise.resolve(mockCTNs),
  getById: async (id: string) =>
    Promise.resolve(mockCTNs.find((c) => c.id === id) || ({} as CTN)),

  // create: (data: Partial<CTN>) =>
  //   fetchProtected(`/admin/main/ctnmodel/`, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   }),
  create: async (_data: Partial<CTN>) => Promise.resolve({ status: 200 }),

  // update: (id: string, data: Partial<CTN>) =>
  //   fetchProtected(`/admin/main/ctnmodel/${id}/`, {
  //     method: "PUT",
  //     body: JSON.stringify(data),
  //   }),
  update: async (_id: string, _data: Partial<CTN>) =>
    Promise.resolve({ status: 200 }),
}

/*
export const ctnAPI = {
  list: () => fetchProtected(`/admin/main/ctnmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/ctnmodel/${id}/`),
  create: (data: Partial<CTN>) =>
    fetchProtected(`/admin/main/ctnmodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<CTN>) =>
    fetchProtected(`/admin/main/ctnmodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
*/
