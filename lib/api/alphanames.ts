// lib/api/alphanames.ts

// Импортируй Axios или используй fetch (пример будет на fetch)
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://your.external.api/v1"

// import { fetchProtected } from "@/lib/utils"

const mockAlphanames: Alphaname[] = [
  {
    id: "1",
    alpha_name: "TEST",
    ctn: "9000",
    system_id: "20100",
    active: true,
    bind_mode: "mode",
    alias: "t",
    ip_address: "127.0.0.1",
    description: "mock",
    created_at: "2024-01-01",
    updated_at: "2024-01-02",
  },
]

export const alphanamesAPI = {
  getById: async (id: string) =>
    Promise.resolve(
      mockAlphanames.find((a) => a.id === id) || ({} as Alphaname)
    ),
  // create: (data: any) =>
  //   fetchProtected(`/admin/main/alphanamemodel/`, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   }),
  create: async (_data: any) => Promise.resolve({ status: 200 }),
  // update: (id: string, data: any) =>
  //   fetchProtected(`/admin/main/alphanamemodel/${id}/`, {
  //     method: "PUT",
  //     body: JSON.stringify(data),
  //   }),
  update: async (_id: string, _data: any) => Promise.resolve({ status: 200 }),
  list: async () => Promise.resolve(mockAlphanames),
  // ... другие методы
}

/*
export const alphanamesAPI = {
  getById: (id: string) => fetchProtected(`/admin/main/alphanamemodel/${id}`),
  create: (data: any) =>
    fetchProtected(`/admin/main/alphanamemodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchProtected(`/admin/main/alphanamemodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  list: () => fetchProtected(`/admin/main/alphanamemodel/`),
}
*/

// Типизация (можно вынести отдельно)
export type Alphaname = {
  id: string
  alpha_name: string
  ctn: string
  system_id: string
  active: boolean
  bind_mode: string
  alias: string
  ip_address: string
  description: string
  created_at?: string
  updated_at?: string
}

// Базовый хелпер (опционально, можно добавить обработку токенов)
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": "Bearer ..." // если требуется
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  return await response.json()
}

// Основные методы работы с API

