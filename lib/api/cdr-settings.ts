import { fetchProtected } from "@/lib/utils"

export type CDRSetting = {
  id: string
  cdr_setting: string
  sms_process_batch: string
  generation_time_value: string
  event_type: string
}

export const cdrSettingsAPI = {
  list: () =>
    fetchProtected(`/admin/main/cdrsettingsmodel/`),

  getById: (id: string) =>
    fetchProtected(`/admin/main/cdrsettingsmodel/${id}/`),

  create: (data: Partial<CDRSetting>) =>
    fetchProtected(`/admin/main/cdrsettingsmodel/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<CDRSetting>) =>
    fetchProtected(`/admin/main/cdrsettingsmodel/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchProtected(`/admin/main/cdrsettingsmodel/${id}/`, {
      method: "DELETE",
    }),
}
