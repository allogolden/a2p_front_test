"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ActionButton } from "@/components/common/action-button"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { alphanamesAPI } from "@/lib/api/alphanames"
import type { Alphaname } from "@/lib/api/alphanames"

export default function AlphanameDetailPage() {
  const router = useRouter()
  const params = useParams()

  // Основное состояние
  const [item, setItem] = useState<Alphaname | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Списки для селектов
  const [alphaNameOptions, setAlphaNameOptions] = useState<string[]>([])
  const [ctnOptions, setCtnOptions] = useState<string[]>([])

  // Получение данных для селектов и детали объекта (если не new)
  useEffect(() => {
    setIsLoading(true)
    setError(null)

    // Функция получения опций (Alpha Name и CTN)
    const fetchOptions = async () => {
      try {
        const [alphaNamesRes, ctnsRes] = await Promise.all([
          alphanamesAPI.getAlphaNamesList(), // Возвращает массив строк
          alphanamesAPI.getCtnList(),        // Возвращает массив строк
        ])
        setAlphaNameOptions(alphaNamesRes.data || [])
        setCtnOptions(ctnsRes.data || [])
      } catch (e) {
        setError("Ошибка при получении опций Alpha Name/CTN")
      }
    }

    // Функция получения объекта для редактирования (если id !== new)
    const fetchItem = async () => {
      if (params.id === "new") {
        // Для создания изначально пустой объект (только с нужными ключами)
        setItem({
          id: "",
          alpha_name: "",
          ctn: "",
          system_id: "",
          active: true,
          bind_mode: "",
          alias: "",
          ip_address: "",
          description: "",
          created_at: "",
          updated_at: "",
        })
        setIsLoading(false)
      } else {
        try {
          const response = await alphanamesAPI.getById(params.id as string)
          if (response.success && response.data) {
            setItem(response.data)
          } else {
            setError("Элемент не найден")
          }
        } catch (e) {
          setError("Ошибка при получении данных элемента")
        } finally {
          setIsLoading(false)
        }
      }
    }

    // Сначала получаем опции, потом — объект (если нужно)
    fetchOptions().then(fetchItem)
  }, [params.id])

  // Сохранение (create/update по внешнему API)
  const handleSave = async () => {
    if (!item) return
    setIsSaving(true)
    setError(null)
    try {
      if (params.id === "new") {
        await alphanamesAPI.create(item)
      } else {
        await alphanamesAPI.update(item.id, item)
      }
      router.push("/alphanames")
    } catch (e) {
      setError("Ошибка при сохранении. Проверьте корректность данных или повторите попытку позже.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleBack = () => {
    router.push("/alphanames")
  }

  // Загрузка
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

  // Ошибка
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <ActionButton onClick={handleBack} variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </ActionButton>
          <div>
            <h1 className="text-3xl font-bold text-red-600">Ошибка</h1>
            <div className="text-red-600">{error}</div>
          </div>
        </div>
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
            <h1 className="text-3xl font-bold">Данные не найдены</h1>
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
          <h1 className="text-3xl font-bold">{params.id === "new" ? "Создание Alphaname" : "Редактирование Alphaname"}</h1>
          <p className="text-muted-foreground">
            {params.id === "new" ? "Заполните данные нового альфа-имени" : "Измените параметры альфа-имени"}
          </p>
        </div>
        <div className="flex gap-2">
          <ActionButton onClick={handleSave} icon={Save} disabled={isSaving}>
            {isSaving ? "Сохранение..." : "Сохранить"}
          </ActionButton>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Детали Alphaname</CardTitle>
          <CardDescription>Все поля обязательны к заполнению</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Alpha Name и CTN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="alpha_name">Alpha Name</Label>
              <Select
                value={item.alpha_name}
                onValueChange={value => setItem({ ...item, alpha_name: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите Alpha Name" />
                </SelectTrigger>
                <SelectContent>
                  {alphaNameOptions.map(opt => (
                    <SelectItem value={opt} key={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctn">CTN</Label>
              <Select
                value={item.ctn}
                onValueChange={value => setItem({ ...item, ctn: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите CTN" />
                </SelectTrigger>
                <SelectContent>
                  {ctnOptions.map(opt => (
                    <SelectItem value={opt} key={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* System ID и Active */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="system_id">System ID</Label>
              <Input
                id="system_id"
                value={item.system_id}
                onChange={e => setItem({ ...item, system_id: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="active">Active</Label>
              <RadioGroup
                id="active"
                value={item.active ? "active" : "inactive"}
                onValueChange={value => setItem({ ...item, active: value === "active" })}
                className="flex flex-row gap-4 mt-2"
              >
                <RadioGroupItem value="active" id="active-yes" />
                <Label htmlFor="active-yes">Active</Label>
                <RadioGroupItem value="inactive" id="active-no" />
                <Label htmlFor="active-no">Inactive</Label>
              </RadioGroup>
            </div>
          </div>
          {/* Bind mode и Alias */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bind_mode">Bind mode</Label>
              <Input
                id="bind_mode"
                value={item.bind_mode}
                onChange={e => setItem({ ...item, bind_mode: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alias">Alias</Label>
              <Input
                id="alias"
                value={item.alias}
                onChange={e => setItem({ ...item, alias: e.target.value })}
              />
            </div>
          </div>
          {/* IP Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ip_address">IP Address</Label>
              <Input
                id="ip_address"
                value={item.ip_address}
                onChange={e => setItem({ ...item, ip_address: e.target.value })}
              />
            </div>
          </div>
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={item.description}
              onChange={e => setItem({ ...item, description: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
