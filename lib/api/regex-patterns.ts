// import { fetchProtected } from "@/lib/utils"

export type RegexPattern = {
  id: string
  variable: string
  pattern: string
  active: boolean | string
  description: string
  ip_address: string
  created: string
  modified: string
  created_by: string
  updated_by: string
}

const mockRegexPatterns: RegexPattern[] = [
  {
    id: "1",
    variable: "var1",
    pattern: "^test$",
    active: true,
    description: "mock",
    ip_address: "127.0.0.1",
    created: "2024-01-01",
    modified: "2024-01-02",
    created_by: "admin",
    updated_by: "admin",
  },
]

export const regexPatternsAPI = {
  list: async () => Promise.resolve(mockRegexPatterns),
  getById: async (id: string) =>
    Promise.resolve(
      mockRegexPatterns.find((p) => p.id === id) || ({} as RegexPattern)
    ),
  // create: (data: Partial<RegexPattern>) => fetchProtected(`/admin/main/regexpatternmodel/`, { method: "POST", body: JSON.stringify(data) }),
  create: async (_data: Partial<RegexPattern>) => Promise.resolve({ status: 200 }),
  // update: (id: string, data: Partial<RegexPattern>) => fetchProtected(`/admin/main/regexpatternmodel/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  update: async (_id: string, _data: Partial<RegexPattern>) => Promise.resolve({ status: 200 }),
}

/*
export const regexPatternsAPI = {
  list: () => fetchProtected(`/admin/main/regexpatternmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/regexpatternmodel/${id}/`),
  create: (data: Partial<RegexPattern>) =>
    fetchProtected(`/admin/main/regexpatternmodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<RegexPattern>) =>
    fetchProtected(`/admin/main/regexpatternmodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
*/
