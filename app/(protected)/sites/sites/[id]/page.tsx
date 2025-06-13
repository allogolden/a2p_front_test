"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ActionButton } from "@/components/common/action-button"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import type { Site } from "@/lib/api/sites"
import { sitesAPI } from "@/lib/api/sites"

export default function SiteDetailPage() {
  const router = useRouter()
  const params = useParams()

  const [item, setItem] = useState<Site | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id === "new") {
      setItem({ id: "", display_name: "", domain: "" })
      setLoading(false)
      return
    }
    sitesAPI
      .getById(params.id as string)
      .then((data) => {
        setItem(data)
      })
      .catch(() => setError("Failed to load site"))
      .finally(() => setLoading(false))
  }, [params.id])

  const handleSave = async () => {
    if (!item) return
    setSaving(true)
    try {
      if (params.id === "new") {
        await sitesAPI.create(item)
      } else {
        await sitesAPI.update(item.id, item)
      }
      router.push("/sites/sites")
    } catch (e) {
      setError("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => router.push("/sites/sites")

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
            <h1 className="text-3xl font-bold">Site not found</h1>
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
            {params.id === "new" ? "Create Site" : "Edit Site"}
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
          <CardTitle>Site Details</CardTitle>
          <CardDescription>All fields are required</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="display_name">Display Name</Label>
            <Input
              id="display_name"
              value={item.display_name}
              onChange={(e) => setItem({ ...item, display_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="domain">Domain</Label>
            <Input
              id="domain"
              value={item.domain}
              onChange={(e) => setItem({ ...item, domain: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
