// import { fetchProtected } from "@/lib/utils"

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

const mockMOMessages: MOMessages[] = [
  {
    id: "1",
    queue_message_id: "q1",
    smpp_message_id: "smpp1",
    source_addr: "1000",
    destination_addr: "2000",
    category: "test",
    submit_status: "ok",
    submit_resp_status: "0",
    delivery_status: "delivered",
    mt_interceptor_log_id: "1",
    process_status: "done",
    sent_at: "2024-01-01",
    delivered_at: "2024-01-01",
  },
]

export const moMessagesAPI = {
  list: async () => Promise.resolve(mockMOMessages),
  getById: async (id: string) =>
    Promise.resolve(
      mockMOMessages.find((m) => m.id === id) || ({} as MOMessages)
    ),
  // create: (data: Partial<MOMessages>) => fetchProtected(`/admin/main/momessagesmodel/`, { method: "POST", body: JSON.stringify(data) }),
  create: async (_data: Partial<MOMessages>) => Promise.resolve({ status: 200 }),
  // update: (id: string, data: Partial<MOMessages>) => fetchProtected(`/admin/main/momessagesmodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  update: async (_id: string, _data: Partial<MOMessages>) => Promise.resolve({ status: 200 }),
}

/*
export const moMessagesAPI = {
  list: () => fetchProtected(`/admin/main/momessagesmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/momessagesmodel/${id}/`),
  create: (data: Partial<MOMessages>) =>
    fetchProtected(`/admin/main/momessagesmodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<MOMessages>) =>
    fetchProtected(`/admin/main/momessagesmodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
*/
