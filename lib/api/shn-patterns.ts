// import { fetchProtected } from "@/lib/utils"

export type SHNPattern = {
  id: string
  system_id: string
  short_number: string
  category: string
  name: string
  pattern: string
  active: boolean | string
  ip_address: string
  description: string
  created: string
  modified: string
  created_by: string
  updated_by: string
}

const mockSHNPatterns: SHNPattern[] = [
  {
    id: "1",
    system_id: "sys_001",
    short_number: "1111",
    category: "info",
    name: "pattern1",
    pattern: "sample",
    active: true,
    ip_address: "127.0.0.1",
    description: "mock",
    created: "2024-01-01",
    modified: "2024-01-02",
    created_by: "admin",
    updated_by: "admin",
  },
]

export const shnPatternsAPI = {
  list: async () => Promise.resolve(mockSHNPatterns),
  getById: async (id: string) =>
    Promise.resolve(
      mockSHNPatterns.find((p) => p.id === id) || ({} as SHNPattern)
    ),
  // create: (data: Partial<SHNPattern>) => fetchProtected(`/admin/main/shnpatternmodel/`, { method: "POST", body: JSON.stringify(data) }),
  create: async (_data: Partial<SHNPattern>) => Promise.resolve({ status: 200 }),
  // update: (id: string, data: Partial<SHNPattern>) => fetchProtected(`/admin/main/shnpatternmodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  update: async (_id: string, _data: Partial<SHNPattern>) => Promise.resolve({ status: 200 }),
}

/*
export const shnPatternsAPI = {
  list: () => fetchProtected(`/admin/main/shnpatternmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/shnpatternmodel/${id}/`),
  create: (data: Partial<SHNPattern>) =>
    fetchProtected(`/admin/main/shnpatternmodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<SHNPattern>) =>
    fetchProtected(`/admin/main/shnpatternmodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
*/
