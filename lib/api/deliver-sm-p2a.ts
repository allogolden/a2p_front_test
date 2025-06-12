import { fetchProtected } from "@/lib/utils"

export type DeliverSmP2A = {
  id: string
  smpp_message_id: string
  delivery_status: string
  message_content_snippet: string
  created_at: string
}

export const deliverSmP2AAPI = {
  list: () => fetchProtected(`/admin/main/deliversmp2amodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/deliversmp2amodel/${id}/`),
  create: (data: Partial<DeliverSmP2A>) => fetchProtected(`/admin/main/deliversmp2amodel/`, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<DeliverSmP2A>) => fetchProtected(`/admin/main/deliversmp2amodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
}
