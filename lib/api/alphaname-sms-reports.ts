export type AlphanameSmsReport = {
  id: string
  alphaname: string
  partner: string
  total: number
  categories: Record<string, number>
  statuses: Record<string, number>
  date: string
}

const mockAlphanameSmsReports: AlphanameSmsReport[] = [
  {
    id: "1",
    alphaname: "OLYMPIA.UZ",
    partner: "TelecomUZ",
    total: 60,
    categories: { Service: 40, Transaction: 20 },
    statuses: { delivered: 55, failed: 5 },
    date: "2024-06-01",
  },
  {
    id: "2",
    alphaname: "FAAcademy",
    partner: "BeeLine",
    total: 45,
    categories: { Education: 45 },
    statuses: { delivered: 40, failed: 5 },
    date: "2024-06-02",
  },
]

export const alphanameSmsReportsAPI = {
  list: async (from?: string, to?: string): Promise<AlphanameSmsReport[]> => {
    let list = [...mockAlphanameSmsReports]

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
  getById: async (id: string): Promise<AlphanameSmsReport | null> =>
    Promise.resolve(
      mockAlphanameSmsReports.find((item) => item.id === id) || null
    ),
  create: async (_data: Partial<AlphanameSmsReport>) => Promise.resolve({ status: 200 }),
  update: async (_id: string, _data: Partial<AlphanameSmsReport>) => Promise.resolve({ status: 200 }),
  delete: async (_id: string) => Promise.resolve({ status: 200 }),
}
