import { fetchProtected } from "@/lib/utils"

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

export const shortNumbersAPI = {
  list: () => fetchProtected(`/admin/main/shortnumbermodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/shortnumbermodel/${id}/`),
  create: (data: Partial<ShortNumber>) => fetchProtected(`/admin/main/shortnumbermodel/`, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<ShortNumber>) => fetchProtected(`/admin/main/shortnumbermodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
}
