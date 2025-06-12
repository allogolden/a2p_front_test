// import { fetchProtected } from "@/lib/utils"

export type MOInterceptorLog = {
  id: string
  system_id: string
  source_addr: string
  destination_addr: string
  short_message: string
  ip_address: string
  created: string
  modified: string
}

const mockMOInterceptorLogs: MOInterceptorLog[] = [
  {
    id: "1",
    system_id: "sys_001",
    source_addr: "1000",
    destination_addr: "2000",
    short_message: "test",
    ip_address: "127.0.0.1",
    created: "2024-01-01",
    modified: "2024-01-02",
  },
]

export const moInterceptorLogsAPI = {
  list: async () => Promise.resolve(mockMOInterceptorLogs),
  getById: async (id: string) =>
    Promise.resolve(
      mockMOInterceptorLogs.find((l) => l.id === id) || ({} as MOInterceptorLog)
    ),
}

/*
export const moInterceptorLogsAPI = {
  list: () => fetchProtected(`/admin/main/mointerceptorlogmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/mointerceptorlogmodel/${id}/`)
}
*/
