"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ActionButton } from "@/components/common/action-button"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import type { CategoryMT } from "@/lib/api/category-mt"
import { categoryMTAPI } from "@/lib/api/category-mt"

export default function CategoryMTDetailPage() {
  const router = useRouter()
  const params = useParams()

  const [item, setItem] = useState<CategoryMT | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id === "new") {
      setItem({
        id: "",
        name: "",
        ip_address: "",
        cdr: "",
        sms_type_number: "",
      })
      setLoading(false)
      return
    }
    categoryMTAPI
      .getById(params.id as string)
      .then((data) => setItem(data))
      .catch(() => setError("Failed to load category"))
      .finally(() => setLoading(false))
  }, [params.id])

  const handleSave = async () => {
    if (!item) return
    setSaving(true)
    try {
      if (params.id === "new") {
        await categoryMTAPI.create(item)
      } else {
        await categoryMTAPI.update(item.id, item)
      }
      router.push("/category-mt")
    } catch (e) {
      setError("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => router.push("/category-mt")

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
            <h1 className="text-3xl font-bold">Category not found</h1>
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
            {params.id === "new" ? "Create Category" : "Edit Category"}
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
          <CardTitle>Category Details</CardTitle>
          <CardDescription>ID: {item.id || "new"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ip_address">IP Address</Label>
            <Input
              id="ip_address"
              value={item.ip_address}
              onChange={(e) => setItem({ ...item, ip_address: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cdr">Cdr</Label>
            <Input
              id="cdr"
              value={item.cdr}
              onChange={(e) => setItem({ ...item, cdr: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sms_type_number">SMS Type Number</Label>
            <Input
              id="sms_type_number"
              value={item.sms_type_number}
              onChange={(e) =>
                setItem({ ...item, sms_type_number: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
