import { fetchProtected } from "@/lib/utils"

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

export const anPatternsAPI = {
  list: () =>
    fetchProtected(`/admin/main/anpatternmodel/`),

  getById: (id: string) =>
    fetchProtected(`/admin/main/anpatternmodel/${id}/`),

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
