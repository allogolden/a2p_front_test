export interface User {
  id: string
  username: string
  email: string
  role: "admin" | "operator" | "viewer"
  status: "active" | "inactive"
  avatar?: string
  created_at: string
  updated_at: string
}

export interface ANPattern {
  id: string
  system_id: string
  ctn: string
  alpha_name: string
  category: string
  name: string
  pattern: string
  active: boolean | string
  ip_address: string
  description: string
  created?: string
  modified?: string
  created_by?: string
  updated_by?: string
}

export interface CTN {
  id: string
  system_id: string
  category: string
  ctn: string
  ip_address: string
  active: boolean | string
  description: string
  created?: string
  modified?: string
  created_by?: string
  updated_by?: string
}

export interface Partner {
  id: string
  system_id: string
  username: string
  active: boolean | string
  ip_address: string
  description: string
  created?: string
  modified?: string
  created_by?: string
  updated_by?: string
}

export interface SHNPattern {
  id: string
  system_id: string
  short_number: string
  category: string
  name: string
  pattern: string
  active: boolean | string
  ip_address: string
  description: string
  created?: string
  modified?: string
  created_by?: string
  updated_by?: string
}

export interface Message {
  id: string
  message_id: string
  source?: string
  destination: string
  text: string
  status: "delivered" | "failed" | "pending" | "rejected"
  timestamp: string
  partner_id?: string
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
