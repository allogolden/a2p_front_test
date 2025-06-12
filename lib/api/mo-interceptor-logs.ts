import { fetchProtected } from "@/lib/utils"

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

export const moInterceptorLogsAPI = {
  list: () => fetchProtected(`/admin/main/mointerceptorlogmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/mointerceptorlogmodel/${id}/`)
}
