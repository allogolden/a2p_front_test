"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import {ArrowLeft, Save, Trash2 } from "lucide-react"
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
import { DeleteDialog } from "@/components/common/delete-dialog"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import type { CTN } from "@/types"
import { ctnAPI } from "@/lib/api/ctns"

export default function CTNDetailPage() {
  const router = useRouter()
  const params = useParams()

  const [item, setItem] = useState<CTN | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id === "new") {
      setItem({
        id: "",
        system_id: "",
        category: "",
        ctn: "",
        ip_address: "",
        active: false,
        description: "",
        created: "",
        modified: "",
        created_by: "",
        updated_by: "",
      })
      setLoading(false)
      return
    }
    ctnAPI
      .getById(params.id as string)
      .then((data) => setItem(data))
      .catch(() => setError("Failed to load CTN"))
      .finally(() => setLoading(false))
  }, [params.id])

  const handleSave = async () => {
    if (!item) return
    setSaving(true)
    try {
      if (params.id === "new") {
        await ctnAPI.create(item)
      } else {
        await ctnAPI.update(item.id, item)
      }
      router.push("/ctns")
    } catch (e) {
      setError("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  
  const handleDelete = async () => {
    if (!item || params.id === "new") return;
    try {
      await ctnAPI.delete(item.id);
      router.push("/ctns");
    } catch (e) {
      setError("Failed to delete");
    }
  }


const handleBack = () => router.push("/ctns")

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
            <h1 className="text-3xl font-bold">CTN not found</h1>
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
            {params.id === "new" ? "Create CTN" : "Edit CTN"}
          </h1>
        </div>
        <div className="flex gap-2">
          {params.id !== "new" && <DeleteDialog onConfirm={handleDelete} />}
          <ActionButton onClick={handleSave} icon={Save} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </ActionButton>
        </div>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      <Card>
        <CardHeader>
          <CardTitle>CTN Details</CardTitle>
          <CardDescription>ID: {item.id || "new"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="system_id">System ID</Label>
            <Input
              id="system_id"
              value={item.system_id}
              onChange={(e) => setItem({ ...item, system_id: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={item.category}
              onChange={(e) => setItem({ ...item, category: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ctn">CTN</Label>
            <Input
              id="ctn"
              value={item.ctn}
              onChange={(e) => setItem({ ...item, ctn: e.target.value })}
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
            <Label htmlFor="active">Active</Label>
            <Input
              id="active"
              value={item.active?.toString()}
              onChange={(e) => setItem({ ...item, active: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={item.description}
              onChange={(e) => setItem({ ...item, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="created">Created</Label>
              <Input
                id="created"
                value={item.created}
                onChange={(e) => setItem({ ...item, created: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modified">Modified</Label>
              <Input
                id="modified"
                value={item.modified}
                onChange={(e) => setItem({ ...item, modified: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="created_by">Created By</Label>
              <Input
                id="created_by"
                value={item.created_by}
                onChange={(e) => setItem({ ...item, created_by: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="updated_by">Updated By</Label>
              <Input
                id="updated_by"
                value={item.updated_by}
                onChange={(e) => setItem({ ...item, updated_by: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
