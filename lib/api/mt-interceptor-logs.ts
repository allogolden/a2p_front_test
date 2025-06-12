// import { fetchProtected } from "@/lib/utils"

export type MTInterceptorLog = {
  id: string
  source_addr: string
  system_id: string
  destination_addr: string
  ip_address: string
  short_message: string
  category: string
  mt_interceptor_id: string
  category_id: string
  created: string
  modified: string
}

const mockMTInterceptorLogs: MTInterceptorLog[] = [
  {
    id: "1",
    source_addr: "1000",
    system_id: "sys_001",
    destination_addr: "2000",
    ip_address: "127.0.0.1",
    short_message: "test",
    category: "info",
    mt_interceptor_id: "1",
    category_id: "1",
    created: "2024-01-01",
    modified: "2024-01-02",
  },
]

export const mtInterceptorLogsAPI = {
  list: async () => Promise.resolve(mockMTInterceptorLogs),
  getById: async (id: string) =>
    Promise.resolve(
      mockMTInterceptorLogs.find((l) => l.id === id) || ({} as MTInterceptorLog)
    ),
}

/*
export const mtInterceptorLogsAPI = {
  list: () => fetchProtected(`/admin/main/mtinterceptorlogmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/mtinterceptorlogmodel/${id}/`)
}
*/
