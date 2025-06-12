// import { fetchProtected } from "@/lib/utils"

export type CustomUser = {
  id: string
  username: string
  is_active: boolean | string    // часто приходит как true/false или "True"/"False"
  is_staff: boolean | string
  date_joined: string
}

const mockCustomUsers: CustomUser[] = [
  {
    id: "1",
    username: "mockuser",
    is_active: true,
    is_staff: false,
    date_joined: "2024-01-01",
  },
]

export const customUsersAPI = {
  list: async () => Promise.resolve(mockCustomUsers),
  getById: async (id: string) =>
    Promise.resolve(
      mockCustomUsers.find((u) => u.id === id) || ({} as CustomUser)
    ),

  // create: (data: Partial<CustomUser>) =>
  //   fetchProtected(`/admin/main/customusermodel/`, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   }),
  create: async (_data: Partial<CustomUser>) => Promise.resolve({ status: 200 }),

  // update: (id: string, data: Partial<CustomUser>) =>
  //   fetchProtected(`/admin/main/customusermodel/${id}/`, {
  //     method: "PUT",
  //     body: JSON.stringify(data),
  //   }),
  update: async (_id: string, _data: Partial<CustomUser>) =>
    Promise.resolve({ status: 200 }),

  // delete: (id: string) =>
  //   fetchProtected(`/admin/main/customusermodel/${id}/`, {
  //     method: "DELETE",
  //   }),
  delete: async (_id: string) => Promise.resolve({ status: 200 }),
}

/*
export const customUsersAPI = {
  list: () => fetchProtected(`/admin/main/customusermodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/customusermodel/${id}/`),
  create: (data: Partial<CustomUser>) =>
    fetchProtected(`/admin/main/customusermodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<CustomUser>) =>
    fetchProtected(`/admin/main/customusermodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchProtected(`/admin/main/customusermodel/${id}/`, {
      method: "DELETE",
    }),
}
*/
