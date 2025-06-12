import { fetchProtected } from "@/lib/utils"

export type Site = {
  id: string
  display_name: string
  domain: string
}

export const sitesAPI = {
  list: () => fetchProtected(`/admin/main/sitemodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/sitemodel/${id}/`),
  create: (data: Partial<Site>) => fetchProtected(`/admin/main/sitemodel/`, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Site>) => fetchProtected(`/admin/main/sitemodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
}
