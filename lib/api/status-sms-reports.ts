export type StatusSmsReport = {
  id: string
  status: string
  total: number
  statuses: Record<string, number>
  date: string
}

const mockStatusSmsReports: StatusSmsReport[] = [
  {
    id: "1",
    status: "delivered",
    total: 210,
    statuses: { delivered: 210, failed: 0 },
    date: "2024-06-03",
  },
  {
    id: "2",
    status: "failed",
    total: 30,
    statuses: { delivered: 0, failed: 30 },
    date: "2024-06-03",
  },
]

export const statusSmsReportsAPI = {
  list: async (from?: string, to?: string): Promise<StatusSmsReport[]> => {
    let list = [...mockStatusSmsReports]

    if (from) {
      const fromDate = new Date(from)
      list = list.filter((item) => new Date(item.date) >= fromDate)
    }

    if (to) {
      const toDate = new Date(to)
      list = list.filter((item) => new Date(item.date) <= toDate)
    }

    return Promise.resolve(list)
  },
  getById: async (id: string): Promise<StatusSmsReport | null> =>
    Promise.resolve(mockStatusSmsReports.find((item) => item.id === id) || null),
  create: async (_data: Partial<StatusSmsReport>) => Promise.resolve({ status: 200 }),
  update: async (_id: string, _data: Partial<StatusSmsReport>) => Promise.resolve({ status: 200 }),
  delete: async (_id: string) => Promise.resolve({ status: 200 }),
}
