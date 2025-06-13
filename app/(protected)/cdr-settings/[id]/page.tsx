"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ActionButton } from "@/components/common/action-button"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import type { CDRSetting } from "@/lib/api/cdr-settings"
import { cdrSettingsAPI } from "@/lib/api/cdr-settings"

export default function CDRSettingDetailPage() {
  const router = useRouter()
  const params = useParams()

  const [item, setItem] = useState<CDRSetting | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id === "new") {
      setItem({
        id: "",
        cdr_setting: "",
        sms_process_batch: "",
        generation_time_value: "",
        event_type: "",
      })
      setLoading(false)
      return
    }
    cdrSettingsAPI
      .getById(params.id as string)
      .then((data) => setItem(data))
      .catch(() => setError("Failed to load setting"))
      .finally(() => setLoading(false))
  }, [params.id])

  const handleSave = async () => {
    if (!item) return
    setSaving(true)
    try {
      if (params.id === "new") {
        await cdrSettingsAPI.create(item)
      } else {
        await cdrSettingsAPI.update(item.id, item)
      }
      router.push("/cdr-settings")
    } catch (e) {
      setError("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => router.push("/cdr-settings")

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <ActionButton onClick={handleBack} variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </ActionButton>
          <div>
            <h1 className="text-3xl font-bold">Loading...</h1>
          </div>
        </div>
        <Card>
          <CardContent className="p-8">
            <LoadingSpinner size="lg" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <ActionButton onClick={handleBack} variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </ActionButton>
          <div>
            <h1 className="text-3xl font-bold">Setting not found</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <ActionButton onClick={handleBack} variant="ghost" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </ActionButton>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {params.id === "new" ? "Create CDR Setting" : "Edit CDR Setting"}
          </h1>
        </div>
        <div className="flex gap-2">
          <ActionButton onClick={handleSave} icon={Save} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </ActionButton>
        </div>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      <Card>
        <CardHeader>
          <CardTitle>CDR Setting Details</CardTitle>
          <CardDescription>ID: {item.id || "new"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cdr_setting">CDR Setting</Label>
            <Input
              id="cdr_setting"
              value={item.cdr_setting}
              onChange={(e) => setItem({ ...item, cdr_setting: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sms_process_batch">SMS Process Batch</Label>
            <Input
              id="sms_process_batch"
              value={item.sms_process_batch}
              onChange={(e) =>
                setItem({ ...item, sms_process_batch: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="generation_time_value">Generation Time Value</Label>
            <Input
              id="generation_time_value"
              value={item.generation_time_value}
              onChange={(e) =>
                setItem({ ...item, generation_time_value: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event_type">Event Type</Label>
            <Input
              id="event_type"
              value={item.event_type}
              onChange={(e) => setItem({ ...item, event_type: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

