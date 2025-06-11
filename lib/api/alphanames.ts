// lib/api/alphanames.ts

// Импортируй Axios или используй fetch (пример будет на fetch)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://your.external.api/v1"

import { fetchProtected } from "@/lib/utils"

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
  // ... другие методы
}

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

