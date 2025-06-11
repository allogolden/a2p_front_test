import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function getCookie(name: string): string {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const lastPart = parts.pop()
    if (lastPart) return lastPart.split(';').shift() || ""
  }
  return ""
}

export async function fetchProtected(
  url: string,
  options: RequestInit = {}
) {
  const csrfToken = getCookie("csrftoken")
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
      ...options.headers,
    },
    ...options,
  })
  if (!res.ok) throw new Error("Ошибка запроса")
  return res.json()
}
