import { fetchProtected } from "@/lib/utils"

export type PeriodicTask = {
  id: string
  name: string
  enabled: boolean | string
  scheduler: string
  interval_schedule: string
  start_datetime: string
  last_run: string
  one_off: boolean | string
}

export const periodicTasksAPI = {
  list: () => fetchProtected(`/admin/main/periodictaskmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/periodictaskmodel/${id}/`),
  create: (data: Partial<PeriodicTask>) => fetchProtected(`/admin/main/periodictaskmodel/`, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<PeriodicTask>) => fetchProtected(`/admin/main/periodictaskmodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
}
