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
import type { CategoryStatistic } from "@/lib/api/category-statistics"
import { categoryStatisticsAPI } from "@/lib/api/category-statistics"

export default function CategoryStatisticsDetailPage() {
  const router = useRouter()
  const params = useParams()

  const [item, setItem] = useState<CategoryStatistic | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id === "new") {
      setItem({
        id: "",
        name: "",
        ctn: "",
        message_types: "",
        pattern_stats: "",
        source_types: "",
        last_updated: "",
      })
      setLoading(false)
      return
    }
    categoryStatisticsAPI
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
        await categoryStatisticsAPI.create(item)
      } else {
        await categoryStatisticsAPI.update(item.id, item)
      }
      router.push("/category-statistics")
    } catch (e) {
      setError("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => router.push("/category-statistics")

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
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={item.name}
              onChange={(e) => setItem({ ...item!, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ctn">CTN</Label>
            <Input
              id="ctn"
              value={item.ctn}
              onChange={(e) => setItem({ ...item!, ctn: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message_types">Message Types</Label>
            <Input
              id="message_types"
              value={item.message_types}
              onChange={(e) =>
                setItem({ ...item!, message_types: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pattern_stats">Pattern Stats</Label>
            <Input
              id="pattern_stats"
              value={item.pattern_stats}
              onChange={(e) =>
                setItem({ ...item!, pattern_stats: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source_types">Source Types</Label>
            <Input
              id="source_types"
              value={item.source_types}
              onChange={(e) =>
                setItem({ ...item!, source_types: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_updated">Last Updated</Label>
            <Input
              id="last_updated"
              value={item.last_updated}
              onChange={(e) =>
                setItem({ ...item!, last_updated: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
