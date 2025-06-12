// import { fetchProtected } from "@/lib/utils"

export type CategoryMT = {
  id: string
  name: string
  ip_address: string
  cdr: string
  sms_type_number: string
  created?: string
  modified?: string
  created_by?: string
  updated_by?: string
}

const mockCategoryMT: CategoryMT[] = [
  {
    id: "1",
    name: "info",
    ip_address: "127.0.0.1",
    cdr: "0",
    sms_type_number: "1",
    created: "2024-01-01",
    modified: "2024-01-02",
    created_by: "admin",
    updated_by: "admin",
  },
]

export const categoryMTAPI = {
  list: async () => Promise.resolve(mockCategoryMT),
  getById: async (id: string) =>
    Promise.resolve(
      mockCategoryMT.find((c) => c.id === id) || ({} as CategoryMT)
    ),

  // create: (data: Partial<CategoryMT>) =>
  //   fetchProtected(`/admin/main/categorymtmodel/`, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   }),
  create: async (_data: Partial<CategoryMT>) => Promise.resolve({ status: 200 }),

  // update: (id: string, data: Partial<CategoryMT>) =>
  //   fetchProtected(`/admin/main/categorymtmodel/${id}/`, {
  //     method: "PUT",
  //     body: JSON.stringify(data),
  //   }),
  update: async (_id: string, _data: Partial<CategoryMT>) =>
    Promise.resolve({ status: 200 }),

  // delete: (id: string) =>
  //   fetchProtected(`/admin/main/categorymtmodel/${id}/`, {
  //     method: "DELETE",
  //   }),
  delete: async (_id: string) => Promise.resolve({ status: 200 }),
}

/*
export const categoryMTAPI = {
  list: () => fetchProtected(`/admin/main/categorymtmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/categorymtmodel/${id}/`),
  create: (data: Partial<CategoryMT>) =>
    fetchProtected(`/admin/main/categorymtmodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<CategoryMT>) =>
    fetchProtected(`/admin/main/categorymtmodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchProtected(`/admin/main/categorymtmodel/${id}/`, {
      method: "DELETE",
    }),
}
*/

