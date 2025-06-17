export type TemplateSmsReport = {
  id: string
  template: string
  partner: string
  total: number
  categories: Record<string, number>
  statuses: Record<string, number>
  date: string
}

const mockTemplateSmsReports: TemplateSmsReport[] = [
  {
    id: "1",
    template: "welcome_msg",
    partner: "TelecomUZ",
    total: 50,
    categories: { Service: 50 },
    statuses: { delivered: 48, failed: 2 },
    date: "2024-06-01",
  },
  {
    id: "2",
    template: "payment_confirm",
    partner: "BeeLine",
    total: 35,
    categories: { Transaction: 35 },
    statuses: { delivered: 34, failed: 1 },
    date: "2024-06-02",
  },
]

export const templateSmsReportsAPI = {
  list: async (from?: string, to?: string): Promise<TemplateSmsReport[]> => {
    let list = [...mockTemplateSmsReports]

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
  getById: async (id: string): Promise<TemplateSmsReport | null> =>
    Promise.resolve(
      mockTemplateSmsReports.find((item) => item.id === id) || null
    ),
  create: async (_data: Partial<TemplateSmsReport>) => Promise.resolve({ status: 200 }),
  update: async (_id: string, _data: Partial<TemplateSmsReport>) => Promise.resolve({ status: 200 }),
  delete: async (_id: string) => Promise.resolve({ status: 200 }),
}
