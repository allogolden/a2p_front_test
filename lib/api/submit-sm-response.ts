// import { fetchProtected } from "@/lib/utils"

export type SubmitSmResponse = {
  id: string
  queue_message_id: string
  smpp_message_id: string
  command_status: string
  sequence_number: string
  created_at: string
}

const mockSubmitSmResponses: SubmitSmResponse[] = [
  {
    id: "1",
    queue_message_id: "q1",
    smpp_message_id: "s1",
    command_status: "0",
    sequence_number: "1",
    created_at: "2024-01-01",
  },
]

export const submitSmResponseAPI = {
  list: async () => Promise.resolve(mockSubmitSmResponses),
  getById: async (id: string) =>
    Promise.resolve(
      mockSubmitSmResponses.find((r) => r.id === id) || ({} as SubmitSmResponse)
    ),
  // create: (data: Partial<SubmitSmResponse>) => fetchProtected(`/admin/main/submitsmresponsemodel/`, { method: "POST", body: JSON.stringify(data) }),
  create: async (_data: Partial<SubmitSmResponse>) => Promise.resolve({ status: 200 }),
  // update: (id: string, data: Partial<SubmitSmResponse>) => fetchProtected(`/admin/main/submitsmresponsemodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  update: async (_id: string, _data: Partial<SubmitSmResponse>) => Promise.resolve({ status: 200 }),
}

/*
export const submitSmResponseAPI = {
  list: () => fetchProtected(`/admin/main/submitsmresponsemodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/submitsmresponsemodel/${id}/`),
  create: (data: Partial<SubmitSmResponse>) =>
    fetchProtected(`/admin/main/submitsmresponsemodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<SubmitSmResponse>) =>
    fetchProtected(`/admin/main/submitsmresponsemodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
*/
