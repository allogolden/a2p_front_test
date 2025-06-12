import { fetchProtected } from "@/lib/utils"

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

export const ctnAPI = {
  list: () =>
    fetchProtected(`/admin/main/ctnmodel/`),

  getById: (id: string) =>
    fetchProtected(`/admin/main/ctnmodel/${id}/`),

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
