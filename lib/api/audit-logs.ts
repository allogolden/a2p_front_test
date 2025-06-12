// import { fetchProtected } from "@/lib/utils"

export type AuditLog = {
  id: string
  user: string
  timestamp: string
  action: string
  table: string
  object: string
  changes: string
}

const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    user: "admin",
    timestamp: "2024-01-01T00:00:00Z",
    action: "create",
    table: "partners",
    object: "1",
    changes: "{}",
  },
]

export const auditLogsAPI = {
  list: async () => Promise.resolve(mockAuditLogs),
  getById: async (id: string) =>
    Promise.resolve(
      mockAuditLogs.find((l) => l.id === id) || ({} as AuditLog)
    ),

  // Чаще всего audit logs нельзя создавать/редактировать с фронта,
  // но если нужно, добавь методы ниже.

  // create: (data: Partial<AuditLog>) =>
  //   fetchProtected(`/admin/main/auditlogmodel/`, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   }),
  create: async (_data: Partial<AuditLog>) => Promise.resolve({ status: 200 }),

  // update: (id: string, data: Partial<AuditLog>) =>
  //   fetchProtected(`/admin/main/auditlogmodel/${id}/`, {
  //     method: "PUT",
  //     body: JSON.stringify(data),
  //   }),
  update: async (_id: string, _data: Partial<AuditLog>) =>
    Promise.resolve({ status: 200 }),

  // delete: (id: string) =>
  //   fetchProtected(`/admin/main/auditlogmodel/${id}/`, {
  //     method: "DELETE",
  //   }),
  delete: async (_id: string) => Promise.resolve({ status: 200 }),
}

/*
export const auditLogsAPI = {
  list: () => fetchProtected(`/admin/main/auditlogmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/auditlogmodel/${id}/`),
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
*/
