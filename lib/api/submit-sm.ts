import { fetchProtected } from "@/lib/utils"

export type SubmitSm = {
  id: string
  queue_message_id: string
  source_address: string
  destination_address: string
  short_message: string
  sequence_number: string
  created_at: string
}

export const submitSmAPI = {
  list: () => fetchProtected(`/admin/main/submitsmmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/submitsmmodel/${id}/`),
  create: (data: Partial<SubmitSm>) => fetchProtected(`/admin/main/submitsmmodel/`, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<SubmitSm>) => fetchProtected(`/admin/main/submitsmmodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
}
