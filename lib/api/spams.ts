import { fetchProtected } from "@/lib/utils"

export type Spam = {
  id: string
  content: string
  source: string
  detected_at: string
  status: string
}

export const spamsAPI = {
  list: () => fetchProtected(`/admin/main/spammodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/spammodel/${id}/`),
  create: (data: Partial<Spam>) => fetchProtected(`/admin/main/spammodel/`, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Spam>) => fetchProtected(`/admin/main/spammodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
}
