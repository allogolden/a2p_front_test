// import { fetchProtected } from "@/lib/utils"

export type ANPattern = {
  id: string
  system_id: string
  ctn: string
  alpha_name: string
  category: string
  name: string
  pattern: string
  active: boolean | string     // зависит от API: может быть "True"/"False" или boolean
  ip_address: string
  description: string
  created?: string
  modified?: string
  created_by?: string
  updated_by?: string
}

const mockANPatterns: ANPattern[] = [
  {
    id: "1",
    system_id: "20100",
    ctn: "9000",
    alpha_name: "TEST",
    category: "general",
    name: "pattern1",
    pattern: "sample",
    active: true,
    ip_address: "127.0.0.1",
    description: "Mock pattern",
    created: "2024-01-01",
    modified: "2024-01-02",
    created_by: "admin",
    updated_by: "admin",
  },
]

export const anPatternsAPI = {
  list: async () => Promise.resolve(mockANPatterns),
  getById: async (id: string) =>
    Promise.resolve(
      mockANPatterns.find((p) => p.id === id) || ({} as ANPattern)
    ),

  // create: (data: Partial<ANPattern>) =>
  //   fetchProtected(`/admin/main/anpatternmodel/`, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   }),
  create: async (_data: Partial<ANPattern>) => Promise.resolve({ status: 200 }),

  // update: (id: string, data: Partial<ANPattern>) =>
  //   fetchProtected(`/admin/main/anpatternmodel/${id}/`, {
  //     method: "PUT",
  //     body: JSON.stringify(data),
  //   }),
  update: async (_id: string, _data: Partial<ANPattern>) =>
    Promise.resolve({ status: 200 }),

  // delete: (id: string) =>
  //   fetchProtected(`/admin/main/anpatternmodel/${id}/`, {
  //     method: "DELETE",
  //   }),
  delete: async (_id: string) => Promise.resolve({ status: 200 }),
}

/*
export const anPatternsAPI = {
  list: () => fetchProtected(`/admin/main/anpatternmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/anpatternmodel/${id}/`),
  create: (data: Partial<ANPattern>) =>
    fetchProtected(`/admin/main/anpatternmodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<ANPattern>) =>
    fetchProtected(`/admin/main/anpatternmodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchProtected(`/admin/main/anpatternmodel/${id}/`, {
      method: "DELETE",
    }),
}
*/
