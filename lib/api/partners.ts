import { fetchProtected } from "@/lib/utils"

export type Partner = {
  id: string
  system_id: string
  username: string
  active: boolean | string
  ip_address: string
  description: string
  created: string
  modified: string
  created_by: string
  updated_by: string
}

export const partnersAPI = {
  list: () => fetchProtected(`/admin/main/partnermodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/partnermodel/${id}/`),
  create: (data: Partial<Partner>) => fetchProtected(`/admin/main/partnermodel/`, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Partner>) => fetchProtected(`/admin/main/partnermodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
}
