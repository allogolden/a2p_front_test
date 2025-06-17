export type ShortNumberSmsReport = {
  id: string
  short_number: string
  partner: string
  total: number
  categories: Record<string, number>
  statuses: Record<string, number>
  date: string
}

const mockShortNumberSmsReports: ShortNumberSmsReport[] = [
  {
    id: "1",
    short_number: "9000",
    partner: "TelecomUZ",
    total: 30,
    categories: { Service: 30 },
    statuses: { delivered: 28, failed: 2 },
    date: "2024-06-01",
  },
  {
    id: "2",
    short_number: "7777",
    partner: "Ucell",
    total: 75,
    categories: { Transaction: 75 },
    statuses: { delivered: 70, failed: 5 },
    date: "2024-06-03",
  },
]

export const shortNumberSmsReportsAPI = {
  list: async (from?: string, to?: string): Promise<ShortNumberSmsReport[]> => {
    let list = [...mockShortNumberSmsReports]

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
  getById: async (id: string): Promise<ShortNumberSmsReport | null> =>
    Promise.resolve(
      mockShortNumberSmsReports.find((item) => item.id === id) || null
    ),
  create: async (_data: Partial<ShortNumberSmsReport>) => Promise.resolve({ status: 200 }),
  update: async (_id: string, _data: Partial<ShortNumberSmsReport>) => Promise.resolve({ status: 200 }),
  delete: async (_id: string) => Promise.resolve({ status: 200 }),
}
