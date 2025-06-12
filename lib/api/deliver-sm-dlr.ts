import { fetchProtected } from "@/lib/utils"

export type DeliverSmDLR = {
  id: string
  smpp_message_id: string
  delivery_status: string
  message_content_snippet: string
  created_at: string
}

export const deliverSmDLRAPI = {
  list: () => fetchProtected(`/admin/main/deliversmdlirmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/deliversmdlirmodel/${id}/`),
  create: (data: Partial<DeliverSmDLR>) => fetchProtected(`/admin/main/deliversmdlirmodel/`, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<DeliverSmDLR>) => fetchProtected(`/admin/main/deliversmdlirmodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
}
