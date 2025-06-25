// import { fetchProtected } from "@/lib/utils"

export type Spam = {
  id: string
  regex: string
  name: string
  active: boolean | string
  description: string
  created: string
  modified: string
}

const mockSpams: Spam[] = [
  {
    id: "1",
    regex: "^spam$",
    name: "Spam pattern",
    active: true,
    description: "Mock spam regex",
    created: "2024-01-01",
    modified: "2024-01-02",
  },
]

export const spamsAPI = {
  list: async () => Promise.resolve(mockSpams),
  getById: async (id: string) =>
    Promise.resolve(mockSpams.find((s) => s.id === id) || ({} as Spam)),
  // create: (data: Partial<Spam>) => fetchProtected(`/admin/main/spammodel/`, { method: "POST", body: JSON.stringify(data) }),
  create: async (_data: Partial<Spam>) => Promise.resolve({ status: 200 }),
  // update: (id: string, data: Partial<Spam>) => fetchProtected(`/admin/main/spammodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  update: async (_id: string, _data: Partial<Spam>) => Promise.resolve({ status: 200 }),
  // delete: (id: string) => fetchProtected(`/admin/main/spammodel/${id}/`, { method: "DELETE" }),
  delete: async (_id: string) => Promise.resolve({ status: 200 }),
}

/*
export const spamsAPI = {
  list: () => fetchProtected(`/admin/main/spammodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/spammodel/${id}/`),
  create: (data: Partial<Spam>) =>
    fetchProtected(`/admin/main/spammodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Spam>) =>
    fetchProtected(`/admin/main/spammodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
*/
