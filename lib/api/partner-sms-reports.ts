export type PartnerSmsReport = {
  id: string
  partner: string
  total: number
  categories: Record<string, number>
  statuses: Record<string, number>
  date: string
}

const mockPartnerSmsReports: PartnerSmsReport[] = [
  {
    id: "1",
    partner: "TelecomUZ",
    total: 120,
    categories: { Service: 70, Transaction: 50 },
    statuses: { delivered: 100, failed: 20 },
    date: "2024-06-01",
  },
  {
    id: "2",
    partner: "BeeLine",
    total: 80,
    categories: { Service: 60, Transaction: 20 },
    statuses: { delivered: 70, failed: 10 },
    date: "2024-06-02",
  },
  {
    id: "3",
    partner: "Ucell",
    total: 150,
    categories: { Service: 100, Transaction: 50 },
    statuses: { delivered: 140, failed: 10 },
    date: "2024-06-03",
  },
]

export const partnerSmsReportsAPI = {
  list: async (from?: string, to?: string): Promise<PartnerSmsReport[]> => {
    let list = [...mockPartnerSmsReports]

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
  getById: async (id: string): Promise<PartnerSmsReport | null> =>
    Promise.resolve(
      mockPartnerSmsReports.find((item) => item.id === id) || null
    ),
  create: async (_data: Partial<PartnerSmsReport>) => Promise.resolve({ status: 200 }),
  update: async (_id: string, _data: Partial<PartnerSmsReport>) => Promise.resolve({ status: 200 }),
  delete: async (_id: string) => Promise.resolve({ status: 200 }),
}
