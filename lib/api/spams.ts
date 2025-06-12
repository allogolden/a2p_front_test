// import { fetchProtected } from "@/lib/utils"

export type Spam = {
  id: string
  content: string
  source: string
  detected_at: string
  status: string
}

const mockSpams: Spam[] = [
  {
    id: "1",
    content: "spam message",
    source: "user",
    detected_at: "2024-01-01",
    status: "new",
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
