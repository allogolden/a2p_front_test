import { fetchProtected } from "@/lib/utils"

export type MOMessages = {
  id: string
  queue_message_id: string
  smpp_message_id: string
  source_addr: string
  destination_addr: string
  category: string
  submit_status: string
  submit_resp_status: string
  delivery_status: string
  mt_interceptor_log_id: string
  process_status: string
  sent_at: string
  delivered_at: string
}

export const moMessagesAPI = {
  list: () => fetchProtected(`/admin/main/momessagesmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/momessagesmodel/${id}/`),
  create: (data: Partial<MOMessages>) => fetchProtected(`/admin/main/momessagesmodel/`, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<MOMessages>) => fetchProtected(`/admin/main/momessagesmodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
}
