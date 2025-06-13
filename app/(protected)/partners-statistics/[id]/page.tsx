"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ActionButton } from "@/components/common/action-button"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import type { PartnerStatistics } from "@/lib/api/partners-statistics"
import { partnersStatisticsAPI } from "@/lib/api/partners-statistics"

export default function PartnerStatisticsDetailPage() {
  const router = useRouter()
  const params = useParams()

  const [item, setItem] = useState<PartnerStatistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id === "new") {
      setItem({ id: "", partner: "", messages_sent: "", success_rate: "", revenue: "" })
      setLoading(false)
      return
    }
    partnersStatisticsAPI
      .getById(params.id as string)
      .then((data) => setItem(data))
      .catch(() => setError("Failed to load statistics"))
      .finally(() => setLoading(false))
  }, [params.id])

  const handleSave = async () => {
    if (!item) return
    setSaving(true)
    try {
      if (params.id === "new") {
        await partnersStatisticsAPI.create(item)
      } else {
        await partnersStatisticsAPI.update(item.id, item)
      }
      router.push("/partners-statistics")
    } catch (e) {
      setError("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => router.push("/partners-statistics")

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
            <h1 className="text-3xl font-bold">Statistic not found</h1>
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
            {params.id === "new" ? "Create Statistic" : "Edit Statistic"}
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
          <CardTitle>Statistic Details</CardTitle>
          <CardDescription>ID: {item.id || "new"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="partner">Partner</Label>
            <Input
              id="partner"
              value={item.partner}
              onChange={(e) => setItem({ ...item!, partner: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="messages_sent">Messages Sent</Label>
            <Input
              id="messages_sent"
              value={item.messages_sent}
              onChange={(e) => setItem({ ...item!, messages_sent: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="success_rate">Success Rate</Label>
            <Input
              id="success_rate"
              value={item.success_rate}
              onChange={(e) => setItem({ ...item!, success_rate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="revenue">Revenue</Label>
            <Input
              id="revenue"
              value={item.revenue}
              onChange={(e) => setItem({ ...item!, revenue: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
