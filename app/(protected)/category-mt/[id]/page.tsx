"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
  ArrowLeft,
  Save,
  Trash2,
  Calendar,
  MessageSquare,
  Activity,
  Users,
  Hash,
  Clock,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActionButton } from "@/components/common/action-button"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
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
import type { CategoryMT } from "@/lib/api/category-mt"
import { categoryMTAPI } from "@/lib/api/category-mt"
import type { CategoryStatistic } from "@/lib/api/category-statistics"
import { categoryStatisticsAPI } from "@/lib/api/category-statistics"

interface CategoryDetails extends CategoryMT {
  statistics: CategoryStatistic
}

export default function CategoryMTDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [category, setCategory] = useState<CategoryDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (params.id === "new") {
          setCategory({
            id: "",
            name: "",
            ip_address: "",
            cdr: "enabled",
            sms_type_number: "",
            created: "",
            modified: "",
            created_by: "",
            updated_by: "",
            statistics: {
              id: "",
              name: "",
              ctn: "",
              message_types: "SMS: 0, MMS: 0, Total: 0",
              pattern_stats: "Active: 0, Inactive: 0",
              source_types: "Alphaname: 0, Short Number: 0",
              last_updated: new Date().toISOString(),
            },
          })
        } else {
          const mtData = await categoryMTAPI.getById(params.id as string)
          const statsData = await categoryStatisticsAPI.getById(
            params.id as string
          )
          setCategory({ ...mtData, statistics: statsData })
        }
      } catch (error) {
        console.error("Failed to fetch category:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategory()
  }, [params.id])

  const handleSave = async () => {
    if (!category) return

    setIsSaving(true)
    try {
      if (params.id === "new") {
        await categoryMTAPI.create(category)
      } else {
        await categoryMTAPI.update(category.id, category)
      }
      router.push("/category-mt")
    } catch (error) {
      console.error("Failed to save category:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!category || params.id === "new") return

    try {
      await categoryMTAPI.delete(category.id)
      router.push("/category-mt")
    } catch (error) {
      console.error("Failed to delete category:", error)
    }
  }

  const handleBack = () => {
    router.push("/category-mt")
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

  if (!category) {
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

  const smsCount = Number.parseInt(category.statistics.message_types.match(/SMS:\s*(\d+)/)?.[1] || "0")
  const mmsCount = Number.parseInt(category.statistics.message_types.match(/MMS:\s*(\d+)/)?.[1] || "0")
  const totalMessages = Number.parseInt(category.statistics.message_types.match(/Total:\s*(\d+)/)?.[1] || "0")

  const activePatterns = Number.parseInt(category.statistics.pattern_stats.match(/Active:\s*(\d+)/)?.[1] || "0")
  const inactivePatterns = Number.parseInt(category.statistics.pattern_stats.match(/Inactive:\s*(\d+)/)?.[1] || "0")
  const totalPatterns = activePatterns + inactivePatterns

  const alphanameCount = Number.parseInt(category.statistics.source_types.match(/Alphaname:\s*(\d+)/)?.[1] || "0")
  const shortNumberCount = Number.parseInt(category.statistics.source_types.match(/Short Number:\s*(\d+)/)?.[1] || "0")
  const totalSources = alphanameCount + shortNumberCount

  const patternEfficiency = totalPatterns > 0 ? Math.round((activePatterns / totalPatterns) * 100) : 0
  const smsPercentage = totalMessages > 0 ? Math.round((smsCount / totalMessages) * 100) : 0
  const mmsPercentage = totalMessages > 0 ? Math.round((mmsCount / totalMessages) * 100) : 0
  const alphanamePercentage = totalSources > 0 ? Math.round((alphanameCount / totalSources) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <ActionButton onClick={handleBack} variant="ghost" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </ActionButton>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{params.id === "new" ? "Create" : "Edit"} Category MT</h1>
          <p className="text-muted-foreground">
            {params.id === "new" ? "Create a new category" : "Manage category settings and view statistics"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {params.id !== "new" && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Updated: {new Date(category.statistics.last_updated).toLocaleDateString()}
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          {params.id !== "new" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <ActionButton variant="destructive" icon={Trash2}>
                  Delete
                </ActionButton>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the category and all its statistics.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <ActionButton onClick={handleSave} icon={Save} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </ActionButton>
        </div>
      </div>

      {params.id !== "new" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">CTN</p>
                  <p className="text-2xl font-bold">{category.statistics.ctn}</p>
                </div>
                <Hash className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                  <p className="text-2xl font-bold">{totalMessages.toLocaleString()}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                +12.5% from last period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Patterns</p>
                  <p className="text-2xl font-bold">{activePatterns}</p>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                {patternEfficiency}% efficiency rate
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sources</p>
                  <p className="text-2xl font-bold">{totalSources.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="configuration" className="space-y-4">
        <TabsList>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          {params.id !== "new" && <TabsTrigger value="statistics">Statistics</TabsTrigger>}
        </TabsList>

        <TabsContent value="configuration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Configuration</CardTitle>
              <CardDescription>Configure the category settings and parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    value={category.name}
                    onChange={(e) => setCategory({ ...category, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ip_address">IP Address</Label>
                  <Input
                    id="ip_address"
                    value={category.ip_address}
                    onChange={(e) => setCategory({ ...category, ip_address: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cdr">CDR</Label>
                  <Select value={category.cdr} onValueChange={(value) => setCategory({ ...category, cdr: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms_type_number">SMS Type Number</Label>
                  <Input
                    id="sms_type_number"
                    value={category.sms_type_number}
                    onChange={(e) => setCategory({ ...category, sms_type_number: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="created">Created</Label>
                  <Input
                    id="created"
                    type="date"
                    value={category.created}
                    onChange={(e) => setCategory({ ...category, created: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modified">Modified</Label>
                  <Input
                    id="modified"
                    type="date"
                    value={category.modified}
                    onChange={(e) => setCategory({ ...category, modified: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="created_by">Created By</Label>
                  <Input
                    id="created_by"
                    value={category.created_by}
                    onChange={(e) => setCategory({ ...category, created_by: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="updated_by">Updated By</Label>
                  <Input
                    id="updated_by"
                    value={category.updated_by}
                    onChange={(e) => setCategory({ ...category, updated_by: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {params.id !== "new" && (
          <TabsContent value="statistics" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Message Types
                  </CardTitle>
                  <CardDescription>Distribution of message types in this category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">SMS Messages</span>
                      <span className="text-sm text-muted-foreground">
                        {smsCount.toLocaleString()} ({smsPercentage}%)
                      </span>
                    </div>
                    <Progress value={smsPercentage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">MMS Messages</span>
                      <span className="text-sm text-muted-foreground">
                        {mmsCount.toLocaleString()} ({mmsPercentage}%)
                      </span>
                    </div>
                    <Progress value={mmsPercentage} className="h-2" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total Messages</span>
                    <span>{totalMessages.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Pattern Statistics
                  </CardTitle>
                  <CardDescription>Active and inactive pattern distribution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Active Patterns</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                        {activePatterns}
                      </Badge>
                    </div>
                    <Progress value={patternEfficiency} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Inactive Patterns</span>
                      <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
                        {inactivePatterns}
                      </Badge>
                    </div>
                    <Progress value={100 - patternEfficiency} className="h-2" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Efficiency Rate</span>
                    <span>{patternEfficiency}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Source Types
                  </CardTitle>
                  <CardDescription>Distribution of message source types</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Alphaname Sources</span>
                      <span className="text-sm text-muted-foreground">
                        {alphanameCount.toLocaleString()} ({alphanamePercentage}%)
                      </span>
                    </div>
                    <Progress value={alphanamePercentage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Short Number Sources</span>
                      <span className="text-sm text-muted-foreground">
                        {shortNumberCount.toLocaleString()} ({100 - alphanamePercentage}%)
                      </span>
                    </div>
                    <Progress value={100 - alphanamePercentage} className="h-2" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total Sources</span>
                    <span>{totalSources.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Category Information
                  </CardTitle>
                  <CardDescription>General information and timestamps</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Category Name</p>
                      <p className="font-medium">{category.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">CTN</p>
                      <p className="font-medium">{category.statistics.ctn}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Created</p>
                      <p className="font-medium">
                        {category.created
                          ? new Date(category.created).toLocaleDateString()
                          : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Modified</p>
                      <p className="font-medium">
                        {category.modified
                          ? new Date(category.modified).toLocaleDateString()
                          : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Stats Updated</p>
                      <p className="font-medium">{new Date(category.statistics.last_updated).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">IP Address</p>
                      <p className="font-medium">{category.ip_address}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Raw Statistics Data</p>
                    <div className="text-xs bg-muted p-3 rounded-md font-mono">
                      <p>Message Types: {category.statistics.message_types}</p>
                      <p>Pattern Stats: {category.statistics.pattern_stats}</p>
                      <p>Source Types: {category.statistics.source_types}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

