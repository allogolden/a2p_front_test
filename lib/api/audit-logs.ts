import { fetchProtected } from "@/lib/utils"

export type AuditLog = {
  id: string
  user: string
  timestamp: string
  action: string
  table: string
  object: string
  changes: string
}

export const auditLogsAPI = {
  list: () =>
    fetchProtected(`/admin/main/auditlogmodel/`),

  getById: (id: string) =>
    fetchProtected(`/admin/main/auditlogmodel/${id}/`),

  // Чаще всего audit logs нельзя создавать/редактировать с фронта,
  // но если нужно, добавь методы ниже.

  create: (data: Partial<AuditLog>) =>
    fetchProtected(`/admin/main/auditlogmodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<AuditLog>) =>
    fetchProtected(`/admin/main/auditlogmodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchProtected(`/admin/main/auditlogmodel/${id}/`, {
      method: "DELETE",
    }),
}
