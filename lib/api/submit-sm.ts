// import { fetchProtected } from "@/lib/utils"

export type SubmitSm = {
  id: string
  queue_message_id: string
  source_address: string
  destination_address: string
  short_message: string
  sequence_number: string
  created_at: string
}

const mockSubmitSms: SubmitSm[] = [
  {
    id: "1",
    queue_message_id: "q1",
    source_address: "1000",
    destination_address: "2000",
    short_message: "Hi",
    sequence_number: "1",
    created_at: "2024-01-01",
  },
]

export const submitSmAPI = {
  list: async () => Promise.resolve(mockSubmitSms),
  getById: async (id: string) =>
    Promise.resolve(mockSubmitSms.find((s) => s.id === id) || ({} as SubmitSm)),
  // create: (data: Partial<SubmitSm>) => fetchProtected(`/admin/main/submitsmmodel/`, { method: "POST", body: JSON.stringify(data) }),
  create: async (_data: Partial<SubmitSm>) => Promise.resolve({ status: 200 }),
  // update: (id: string, data: Partial<SubmitSm>) => fetchProtected(`/admin/main/submitsmmodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  update: async (_id: string, _data: Partial<SubmitSm>) => Promise.resolve({ status: 200 }),
}

/*
export const submitSmAPI = {
  list: () => fetchProtected(`/admin/main/submitsmmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/submitsmmodel/${id}/`),
  create: (data: Partial<SubmitSm>) =>
    fetchProtected(`/admin/main/submitsmmodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<SubmitSm>) =>
    fetchProtected(`/admin/main/submitsmmodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
*/
