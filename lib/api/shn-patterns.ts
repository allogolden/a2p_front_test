import { fetchProtected } from "@/lib/utils"

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

export const shnPatternsAPI = {
  list: () => fetchProtected(`/admin/main/shnpatternmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/shnpatternmodel/${id}/`),
  create: (data: Partial<SHNPattern>) => fetchProtected(`/admin/main/shnpatternmodel/`, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<SHNPattern>) => fetchProtected(`/admin/main/shnpatternmodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
}
