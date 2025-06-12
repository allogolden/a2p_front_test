// import { fetchProtected } from "@/lib/utils"

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

const mockPeriodicTasks: PeriodicTask[] = [
  {
    id: "1",
    name: "task1",
    enabled: true,
    scheduler: "daily",
    interval_schedule: "24h",
    start_datetime: "2024-01-01T00:00:00Z",
    last_run: "2024-01-02T00:00:00Z",
    one_off: false,
  },
]

export const periodicTasksAPI = {
  list: async () => Promise.resolve(mockPeriodicTasks),
  getById: async (id: string) =>
    Promise.resolve(
      mockPeriodicTasks.find((t) => t.id === id) || ({} as PeriodicTask)
    ),
  // create: (data: Partial<PeriodicTask>) => fetchProtected(`/admin/main/periodictaskmodel/`, { method: "POST", body: JSON.stringify(data) }),
  create: async (_data: Partial<PeriodicTask>) => Promise.resolve({ status: 200 }),
  // update: (id: string, data: Partial<PeriodicTask>) => fetchProtected(`/admin/main/periodictaskmodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  update: async (_id: string, _data: Partial<PeriodicTask>) => Promise.resolve({ status: 200 }),
}

/*
export const periodicTasksAPI = {
  list: () => fetchProtected(`/admin/main/periodictaskmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/periodictaskmodel/${id}/`),
  create: (data: Partial<PeriodicTask>) =>
    fetchProtected(`/admin/main/periodictaskmodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<PeriodicTask>) =>
    fetchProtected(`/admin/main/periodictaskmodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
*/
