// lib/api/alphanames.ts

// Импортируй Axios или используй fetch (пример будет на fetch)
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://your.external.api/v1"

// import { fetchProtected } from "@/lib/utils"
import type { ApiResponse, PaginatedResponse } from "@/types"

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
  async getById(id: string): Promise<ApiResponse<Alphaname>> {
    const item = mockAlphanames.find((a) => a.id === id)
    if (!item) {
      return { data: null as any, success: false, message: "Item not found" }
    }
    return { data: item, success: true }
  },
  create: async (data: Alphaname): Promise<ApiResponse<Alphaname>> => {
    const newItem: Alphaname = {
      ...data,
      id: Math.random().toString(36).slice(2),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    mockAlphanames.push(newItem)
    return { data: newItem, success: true }
  },
  update: async (id: string, updates: Partial<Alphaname>): Promise<ApiResponse<Alphaname>> => {
    const index = mockAlphanames.findIndex((a) => a.id === id)
    if (index === -1) {
      return { data: null as any, success: false, message: "Item not found" }
    }
    mockAlphanames[index] = { ...mockAlphanames[index], ...updates, updated_at: new Date().toISOString() }
    return { data: mockAlphanames[index], success: true }
  },
  list: async (): Promise<PaginatedResponse<Alphaname>> => {
    return {
      data: mockAlphanames,
      total: mockAlphanames.length,
      page: 1,
      limit: mockAlphanames.length,
      totalPages: 1,
    }
  },
  getAlphaNamesList: async (): Promise<ApiResponse<string[]>> => {
    return { data: mockAlphanames.map((a) => a.alpha_name), success: true }
  },
  getCtnList: async (): Promise<ApiResponse<string[]>> => {
    return { data: mockAlphanames.map((a) => a.ctn), success: true }
  },
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

