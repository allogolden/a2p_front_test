import { fetchProtected } from "@/lib/utils"

export type CustomUser = {
  id: string
  username: string
  is_active: boolean | string    // часто приходит как true/false или "True"/"False"
  is_staff: boolean | string
  date_joined: string
}

export const customUsersAPI = {
  list: () =>
    fetchProtected(`/admin/main/customusermodel/`),

  getById: (id: string) =>
    fetchProtected(`/admin/main/customusermodel/${id}/`),

  create: (data: Partial<CustomUser>) =>
    fetchProtected(`/admin/main/customusermodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<CustomUser>) =>
    fetchProtected(`/admin/main/customusermodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchProtected(`/admin/main/customusermodel/${id}/`, {
      method: "DELETE",
    }),
}
