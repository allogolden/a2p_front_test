// import { fetchProtected } from "@/lib/utils"

export type DeliverSmDLR = {
  id: string
  smpp_message_id: string
  delivery_status: string
  message_content_snippet: string
  created_at: string
}

const mockDeliverSmDLR: DeliverSmDLR[] = [
  {
    id: "1",
    smpp_message_id: "msg001",
    delivery_status: "delivered",
    message_content_snippet: "Hello",
    created_at: "2024-01-01T00:00:00Z",
  },
]

export const deliverSmDLRAPI = {
  list: async () => Promise.resolve(mockDeliverSmDLR),
  getById: async (id: string) =>
    Promise.resolve(
      mockDeliverSmDLR.find((d) => d.id === id) || ({} as DeliverSmDLR)
    ),
  // create: (data: Partial<DeliverSmDLR>) => fetchProtected(`/admin/main/deliversmdlirmodel/`, { method: "POST", body: JSON.stringify(data) }),
  create: async (_data: Partial<DeliverSmDLR>) => Promise.resolve({ status: 200 }),
  // update: (id: string, data: Partial<DeliverSmDLR>) => fetchProtected(`/admin/main/deliversmdlirmodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  update: async (_id: string, _data: Partial<DeliverSmDLR>) => Promise.resolve({ status: 200 }),
}

/*
export const deliverSmDLRAPI = {
  list: () => fetchProtected(`/admin/main/deliversmdlirmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/deliversmdlirmodel/${id}/`),
  create: (data: Partial<DeliverSmDLR>) =>
    fetchProtected(`/admin/main/deliversmdlirmodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<DeliverSmDLR>) =>
    fetchProtected(`/admin/main/deliversmdlirmodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
*/
