// import { fetchProtected } from "@/lib/utils"

export type CategoryStatistic = {
  id: string
  name: string
  ctn: string
  message_types: string
  pattern_stats: string
  source_types: string
  last_updated: string
}

const mockCategoryStats: CategoryStatistic[] = [
  {
    id: "1",
    name: "Default_category",
    ctn: "998917792400",
    message_types: "Total: 0 (SAR: 0, UDH: 0, Payload: 0, Simple: 0)",
    pattern_stats: "Pattern Matched: 0, Auto Categorized: 0",
    source_types: "Alphaname: 0, Short Number: 0",
    last_updated: "2025-06-10 13:13:12",
  },
  {
    id: "2",
    name: "eGov",
    ctn: "998900048741",
    message_types: "Total: 110 (SAR: 0, UDH: 74, Payload: 0, Simple: 36)",
    pattern_stats: "Pattern Matched: 110, Auto Categorized: 0",
    source_types: "Alphaname: 110, Short Number: 0",
    last_updated: "2025-06-10 13:13:12",
  },
  {
    id: "3",
    name: "Reklama",
    ctn: "998910059727",
    message_types: "Total: 166 (SAR: 0, UDH: 112, Payload: 0, Simple: 54)",
    pattern_stats: "Pattern Matched: 166, Auto Categorized: 0",
    source_types: "Alphaname: 150, Short Number: 16",
    last_updated: "2025-06-10 13:13:12",
  },
  {
    id: "4",
    name: "Reklama (Digital)",
    ctn: "998910059727",
    message_types: "Total: 60642 (SAR: 0, UDH: 4, Payload: 0, Simple: 60638)",
    pattern_stats: "Pattern Matched: 60642, Auto Categorized: 0",
    source_types: "Alphaname: 0, Short Number: 4340",
    last_updated: "2025-04-18 10:47:19",
  },
  {
    id: "5",
    name: "Service",
    ctn: "998907881122",
    message_types: "Total: 0 (SAR: 0, UDH: 0, Payload: 0, Simple: 0)",
    pattern_stats: "Pattern Matched: 0, Auto Categorized: 0",
    source_types: "Alphaname: 0, Short Number: 0",
    last_updated: "2025-06-10 13:13:12",
  },
  {
    id: "6",
    name: "Transaction",
    ctn: "998909652030",
    message_types: "Total: 41 (SAR: 0, UDH: 3, Payload: 0, Simple: 38)",
    pattern_stats: "Pattern Matched: 41, Auto Categorized: 0",
    source_types: "Alphaname: 26, Short Number: 12",
    last_updated: "2025-06-10 13:13:12",
  },
  {
    id: "7",
    name: "Transactions",
    ctn: "998910059725",
    message_types: "Total: 0 (SAR: 0, UDH: 0, Payload: 0, Simple: 0)",
    pattern_stats: "Pattern Matched: 0, Auto Categorized: 0",
    source_types: "Alphaname: 0, Short Number: 0",
    last_updated: "2025-06-10 13:13:12",
  },
]

export const categoryStatisticsAPI = {
  list: async () => Promise.resolve(mockCategoryStats),
  getById: async (id: string) =>
    Promise.resolve(
      mockCategoryStats.find((c) => c.id === id) || ({} as CategoryStatistic)
    ),
  // create: (data: Partial<CategoryStatistic>) =>
  //   fetchProtected(`/admin/main/categorystatisticsmodel/`, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   }),
  create: async (_data: Partial<CategoryStatistic>) =>
    Promise.resolve({ status: 200 }),
  // update: (id: string, data: Partial<CategoryStatistic>) =>
  //   fetchProtected(`/admin/main/categorystatisticsmodel/${id}/`, {
  //     method: "PUT",
  //     body: JSON.stringify(data),
  //   }),
  update: async (_id: string, _data: Partial<CategoryStatistic>) =>
    Promise.resolve({ status: 200 }),
  // delete: (id: string) =>
  //   fetchProtected(`/admin/main/categorystatisticsmodel/${id}/`, {
  //     method: "DELETE",
  //   }),
  delete: async (_id: string) => Promise.resolve({ status: 200 }),
}

/*
export const categoryStatisticsAPI = {
  list: () => fetchProtected(`/admin/main/categorystatisticsmodel/`),
  getById: (id: string) =>
    fetchProtected(`/admin/main/categorystatisticsmodel/${id}/`),
  create: (data: Partial<CategoryStatistic>) =>
    fetchProtected(`/admin/main/categorystatisticsmodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<CategoryStatistic>) =>
    fetchProtected(`/admin/main/categorystatisticsmodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchProtected(`/admin/main/categorystatisticsmodel/${id}/`, {
      method: "DELETE",
    }),
}
*/
