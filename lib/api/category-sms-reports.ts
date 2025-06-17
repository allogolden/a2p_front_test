export type CategorySmsReport = {
  id: string
  category: string
  total: number
  statuses: Record<string, number>
  date: string
}

const mockCategorySmsReports: CategorySmsReport[] = [
  {
    id: "1",
    category: "Service",
    total: 100,
    statuses: { delivered: 95, failed: 5 },
    date: "2024-06-01",
  },
  {
    id: "2",
    category: "Transaction",
    total: 125,
    statuses: { delivered: 115, failed: 10 },
    date: "2024-06-03",
  },
]

export const categorySmsReportsAPI = {
  list: async (from?: string, to?: string): Promise<CategorySmsReport[]> => {
    let list = [...mockCategorySmsReports]

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
  getById: async (id: string): Promise<CategorySmsReport | null> =>
    Promise.resolve(
      mockCategorySmsReports.find((item) => item.id === id) || null
    ),
  create: async (_data: Partial<CategorySmsReport>) => Promise.resolve({ status: 200 }),
  update: async (_id: string, _data: Partial<CategorySmsReport>) => Promise.resolve({ status: 200 }),
  delete: async (_id: string) => Promise.resolve({ status: 200 }),
}
