import { fetchProtected } from "@/lib/utils"

export type RegexPattern = {
  id: string
  variable: string
  pattern: string
  active: boolean | string
  description: string
  ip_address: string
  created: string
  modified: string
  created_by: string
  updated_by: string
}

export const regexPatternsAPI = {
  list: () => fetchProtected(`/admin/main/regexpatternmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/regexpatternmodel/${id}/`),
  create: (data: Partial<RegexPattern>) => fetchProtected(`/admin/main/regexpatternmodel/`, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<RegexPattern>) => fetchProtected(`/admin/main/regexpatternmodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
}
