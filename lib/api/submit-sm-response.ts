import { fetchProtected } from "@/lib/utils"

export type SubmitSmResponse = {
  id: string
  queue_message_id: string
  smpp_message_id: string
  command_status: string
  sequence_number: string
  created_at: string
}

export const submitSmResponseAPI = {
  list: () => fetchProtected(`/admin/main/submitsmresponsemodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/submitsmresponsemodel/${id}/`),
  create: (data: Partial<SubmitSmResponse>) => fetchProtected(`/admin/main/submitsmresponsemodel/`, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<SubmitSmResponse>) => fetchProtected(`/admin/main/submitsmresponsemodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
}
