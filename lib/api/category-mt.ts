import { fetchProtected } from "@/lib/utils"

export type CategoryMT = {
  id: string
  name: string
  ip_address: string
  cdr: string
  sms_type_number: string
  created?: string
  modified?: string
  created_by?: string
  updated_by?: string
}

export const categoryMTAPI = {
  list: () =>
    fetchProtected(`/admin/main/categorymtmodel/`),

  getById: (id: string) =>
    fetchProtected(`/admin/main/categorymtmodel/${id}/`),

  create: (data: Partial<CategoryMT>) =>
    fetchProtected(`/admin/main/categorymtmodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<CategoryMT>) =>
    fetchProtected(`/admin/main/categorymtmodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchProtected(`/admin/main/categorymtmodel/${id}/`, {
      method: "DELETE",
    }),
}

