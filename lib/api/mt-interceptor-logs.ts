import { fetchProtected } from "@/lib/utils"

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

export const mtInterceptorLogsAPI = {
  list: () => fetchProtected(`/admin/main/mtinterceptorlogmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/mtinterceptorlogmodel/${id}/`)
}
