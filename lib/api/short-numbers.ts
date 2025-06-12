// import { fetchProtected } from "@/lib/utils"

export type ShortNumber = {
  id: string
  system_id: string
  ctn: string
  short_number: string
  active: boolean | string
  bind_mode: string
  alias: string
  ip_address: string
  description: string
  created: string
  modified: string
  created_by: string
  updated_by: string
}

const mockShortNumbers: ShortNumber[] = [
  {
    id: "1",
    system_id: "sys_001",
    ctn: "12345",
    short_number: "1111",
    active: true,
    bind_mode: "bind",
    alias: "short",
    ip_address: "127.0.0.1",
    description: "mock",
    created: "2024-01-01",
    modified: "2024-01-02",
    created_by: "admin",
    updated_by: "admin",
  },
]

export const shortNumbersAPI = {
  list: async () => Promise.resolve(mockShortNumbers),
  getById: async (id: string) =>
    Promise.resolve(
      mockShortNumbers.find((n) => n.id === id) || ({} as ShortNumber)
    ),
  // create: (data: Partial<ShortNumber>) => fetchProtected(`/admin/main/shortnumbermodel/`, { method: "POST", body: JSON.stringify(data) }),
  create: async (_data: Partial<ShortNumber>) => Promise.resolve({ status: 200 }),
  // update: (id: string, data: Partial<ShortNumber>) => fetchProtected(`/admin/main/shortnumbermodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  update: async (_id: string, _data: Partial<ShortNumber>) => Promise.resolve({ status: 200 }),
}

/*
export const shortNumbersAPI = {
  list: () => fetchProtected(`/admin/main/shortnumbermodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/shortnumbermodel/${id}/`),
  create: (data: Partial<ShortNumber>) =>
    fetchProtected(`/admin/main/shortnumbermodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<ShortNumber>) =>
    fetchProtected(`/admin/main/shortnumbermodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
*/
