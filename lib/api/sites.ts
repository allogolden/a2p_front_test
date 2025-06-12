// import { fetchProtected } from "@/lib/utils"

export type Site = {
  id: string
  display_name: string
  domain: string
}

const mockSites: Site[] = [
  {
    id: "1",
    display_name: "Main",
    domain: "example.com",
  },
]

export const sitesAPI = {
  list: async () => Promise.resolve(mockSites),
  getById: async (id: string) =>
    Promise.resolve(mockSites.find((s) => s.id === id) || ({} as Site)),
  // create: (data: Partial<Site>) => fetchProtected(`/admin/main/sitemodel/`, { method: "POST", body: JSON.stringify(data) }),
  create: async (_data: Partial<Site>) => Promise.resolve({ status: 200 }),
  // update: (id: string, data: Partial<Site>) => fetchProtected(`/admin/main/sitemodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  update: async (_id: string, _data: Partial<Site>) => Promise.resolve({ status: 200 }),
}

/*
export const sitesAPI = {
  list: () => fetchProtected(`/admin/main/sitemodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/sitemodel/${id}/`),
  create: (data: Partial<Site>) =>
    fetchProtected(`/admin/main/sitemodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Site>) =>
    fetchProtected(`/admin/main/sitemodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
*/
