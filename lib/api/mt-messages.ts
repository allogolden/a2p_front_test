// import { fetchProtected } from "@/lib/utils"

export type MTMessages = {
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

const mockMTMessages: MTMessages[] = [
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

export const mtMessagesAPI = {
  list: async () => Promise.resolve(mockMTMessages),
  getById: async (id: string) =>
    Promise.resolve(
      mockMTMessages.find((m) => m.id === id) || ({} as MTMessages)
    ),
  // create: (data: Partial<MTMessages>) => fetchProtected(`/admin/main/mtmessagesmodel/`, { method: "POST", body: JSON.stringify(data) }),
  create: async (_data: Partial<MTMessages>) => Promise.resolve({ status: 200 }),
  // update: (id: string, data: Partial<MTMessages>) => fetchProtected(`/admin/main/mtmessagesmodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  update: async (_id: string, _data: Partial<MTMessages>) => Promise.resolve({ status: 200 }),
}

/*
export const mtMessagesAPI = {
  list: () => fetchProtected(`/admin/main/mtmessagesmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/mtmessagesmodel/${id}/`),
  create: (data: Partial<MTMessages>) =>
    fetchProtected(`/admin/main/mtmessagesmodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<MTMessages>) =>
    fetchProtected(`/admin/main/mtmessagesmodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
*/
