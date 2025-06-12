// import { fetchProtected } from "@/lib/utils"

export type CDRSetting = {
  id: string
  cdr_setting: string
  sms_process_batch: string
  generation_time_value: string
  event_type: string
}

const mockCDRSettings: CDRSetting[] = [
  {
    id: "1",
    cdr_setting: "default",
    sms_process_batch: "10",
    generation_time_value: "5m",
    event_type: "MO",
  },
]

export const cdrSettingsAPI = {
  list: async () => Promise.resolve(mockCDRSettings),
  getById: async (id: string) =>
    Promise.resolve(
      mockCDRSettings.find((c) => c.id === id) || ({} as CDRSetting)
    ),

  // create: (data: Partial<CDRSetting>) =>
  //   fetchProtected(`/admin/main/cdrsettingsmodel/`, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   }),
  create: async (_data: Partial<CDRSetting>) => Promise.resolve({ status: 200 }),

  // update: (id: string, data: Partial<CDRSetting>) =>
  //   fetchProtected(`/admin/main/cdrsettingsmodel/${id}/`, {
  //     method: "PUT",
  //     body: JSON.stringify(data),
  //   }),
  update: async (_id: string, _data: Partial<CDRSetting>) =>
    Promise.resolve({ status: 200 }),

  // delete: (id: string) =>
  //   fetchProtected(`/admin/main/cdrsettingsmodel/${id}/`, {
  //     method: "DELETE",
  //   }),
  delete: async (_id: string) => Promise.resolve({ status: 200 }),
}

/*
export const cdrSettingsAPI = {
  list: () => fetchProtected(`/admin/main/cdrsettingsmodel/`),
  getById: (id: string) => fetchProtected(`/admin/main/cdrsettingsmodel/${id}/`),
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
*/
