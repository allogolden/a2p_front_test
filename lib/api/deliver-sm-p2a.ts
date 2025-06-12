// import { fetchProtected } from "@/lib/utils"

export type DeliverSmP2A = {
  id: string
  smpp_message_id: string
  delivery_status: string
  message_content_snippet: string
  created_at: string
}

const mockDeliverSmP2A: DeliverSmP2A[] = [
  {
    id: "1",
    smpp_message_id: "msg002",
    delivery_status: "delivered",
    message_content_snippet: "Hi",
    created_at: "2024-01-01T01:00:00Z",
  },
]

export const deliverSmP2AAPI = {
  list: async () => Promise.resolve(mockDeliverSmP2A),
  getById: async (id: string) =>
    Promise.resolve(
      mockDeliverSmP2A.find((d) => d.id === id) || ({} as DeliverSmP2A)
    ),
  // create: (data: Partial<DeliverSmP2A>) => fetchProtected(`/admin/main/deliversmp2amodel/`, { method: "POST", body: JSON.stringify(data) }),
  create: async (_data: Partial<DeliverSmP2A>) => Promise.resolve({ status: 200 }),
  // update: (id: string, data: Partial<DeliverSmP2A>) => fetchProtected(`/admin/main/deliversmp2amodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  update: async (_id: string, _data: Partial<DeliverSmP2A>) => Promise.resolve({ status: 200 }),
}

/*
export const deliverSmP2AAPI = {
  list: () => fetchProtected(`/admin/main/deliversmp2amodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/deliversmp2amodel/${id}/`),
  create: (data: Partial<DeliverSmP2A>) =>
    fetchProtected(`/admin/main/deliversmp2amodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<DeliverSmP2A>) =>
    fetchProtected(`/admin/main/deliversmp2amodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
*/
