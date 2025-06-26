"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import { DeleteDialog } from "@/components/common/delete-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ActionButton } from "@/components/common/action-button"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { anPatternsAPI } from "@/lib/api"
import type { ANPattern } from "@/types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ANPatternDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [pattern, setPattern] = useState<ANPattern | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchPattern = async () => {
      try {
        const response = await anPatternsAPI.getById(params.id as string)
        if (response.success) {
          setPattern(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch pattern:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id !== "new") {
      fetchPattern()
    } else {
      setPattern({
        id: "",
        system_id: "",
        ctn: "",
        alpha_name: "",
        category: "",
        name: "",
        pattern: "",
        active: false,
        ip_address: "",
        description: "",
        created: "",
        modified: "",
        created_by: "",
        updated_by: "",
      })
      setIsLoading(false)
    }
  }, [params.id])

  const handleSave = async () => {
    if (!pattern) return

    setIsSaving(true)
    try {
      if (params.id === "new") {
        await anPatternsAPI.create(pattern)
      } else {
        await anPatternsAPI.update(pattern.id, pattern)
      }
      router.push("/an-patterns")
    } catch (error) {
      console.error("Failed to save pattern:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!pattern || params.id === "new") return

    try {
      await anPatternsAPI.delete(pattern.id)
      router.push("/an-patterns")
    } catch (error) {
      console.error("Failed to delete pattern:", error)
    }
  }

  const handleBack = () => {
    router.push("/an-patterns")
  }

  if (isLoading) {
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

  if (!pattern) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <ActionButton onClick={handleBack} variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </ActionButton>
          <div>
            <h1 className="text-3xl font-bold">Pattern not found</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <ActionButton onClick={handleBack} variant="ghost" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </ActionButton>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{params.id === "new" ? "Create" : "Edit"} AN Pattern</h1>
          <p className="text-muted-foreground">
            {params.id === "new" ? "Create a new pattern" : "Update the pattern details"}
          </p>
        </div>
        <div className="flex gap-2">
          {params.id !== "new" && <DeleteDialog onConfirm={handleDelete} />}
          <ActionButton onClick={handleSave} icon={Save} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </ActionButton>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Pattern Details</CardTitle>
          <CardDescription>Configure the AN pattern settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="system_id">System ID</Label>
              <Input
                id="system_id"
                value={pattern.system_id}
                onChange={(e) => setPattern({ ...pattern, system_id: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctn">CTN</Label>
              <Input
                id="ctn"
                value={pattern.ctn}
                onChange={(e) => setPattern({ ...pattern, ctn: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="alpha_name">Alpha Name</Label>
              <Input
                id="alpha_name"
                value={pattern.alpha_name}
                onChange={(e) => setPattern({ ...pattern, alpha_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={pattern.name}
                onChange={(e) => setPattern({ ...pattern, name: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pattern">Pattern</Label>
              <Input
                id="pattern"
                value={pattern.pattern}
                onChange={(e) => setPattern({ ...pattern, pattern: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={pattern.category} onValueChange={(value) => setPattern({ ...pattern, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Payment">Payment</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Transaction">Transaction</SelectItem>
                  <SelectItem value="Banking">Banking</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ip_address">IP Address</Label>
              <Input
                id="ip_address"
                value={pattern.ip_address}
                onChange={(e) => setPattern({ ...pattern, ip_address: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="active">Active</Label>
              <Input
                id="active"
                value={String(pattern.active)}
                onChange={(e) => setPattern({ ...pattern, active: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={pattern.description}
              onChange={(e) => setPattern({ ...pattern, description: e.target.value })}
              rows={3}
            />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="created_by">Created By</Label>
              <Input
                id="created_by"
                value={pattern.created_by}
                onChange={(e) => setPattern({ ...pattern, created_by: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="updated_by">Updated By</Label>
              <Input
                id="updated_by"
                value={pattern.updated_by}
                onChange={(e) => setPattern({ ...pattern, updated_by: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
