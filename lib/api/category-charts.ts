import { categoryStatisticsAPI } from "./category-statistics"
import type { CategoryStatistic } from "./category-statistics"

export interface MessageTypeStat {
  id: string
  name: string
  sar: number
  udh: number
  payload: number
  simple: number
  total: number
  last_updated: string
}

export interface PatternStat {
  id: string
  name: string
  matched: number
  auto: number
  last_updated: string
}

export interface SourceTypeStat {
  id: string
  name: string
  alphaname: number
  short_number: number
  last_updated: string
}

export interface TrendPoint {
  date: string
  messages: number
  patterns: number
  sources: number
}

const parseMessageTypes = (item: CategoryStatistic): MessageTypeStat => {
  return {
    id: item.id,
    name: item.name,
    sar: parseInt(item.message_types.match(/SAR:\s*(\d+)/)?.[1] || "0"),
    udh: parseInt(item.message_types.match(/UDH:\s*(\d+)/)?.[1] || "0"),
    payload: parseInt(item.message_types.match(/Payload:\s*(\d+)/)?.[1] || "0"),
    simple: parseInt(item.message_types.match(/Simple:\s*(\d+)/)?.[1] || "0"),
    total: parseInt(item.message_types.match(/Total:\s*(\d+)/)?.[1] || "0"),
    last_updated: item.last_updated,
  }
}

const parsePatternStats = (item: CategoryStatistic): PatternStat => {
  return {
    id: item.id,
    name: item.name,
    matched: parseInt(item.pattern_stats.match(/Pattern Matched:\s*(\d+)/)?.[1] || "0"),
    auto: parseInt(item.pattern_stats.match(/Auto Categorized:\s*(\d+)/)?.[1] || "0"),
    last_updated: item.last_updated,
  }
}

const parseSourceTypes = (item: CategoryStatistic): SourceTypeStat => {
  return {
    id: item.id,
    name: item.name,
    alphaname: parseInt(item.source_types.match(/Alphaname:\s*(\d+)/)?.[1] || "0"),
    short_number: parseInt(item.source_types.match(/Short Number:\s*(\d+)/)?.[1] || "0"),
    last_updated: item.last_updated,
  }
}

export const messageTypesAPI = {
  list: async (): Promise<MessageTypeStat[]> => {
    const list = await categoryStatisticsAPI.list()
    return list.map(parseMessageTypes)
  },
}

export const patternStatsAPI = {
  list: async (): Promise<PatternStat[]> => {
    const list = await categoryStatisticsAPI.list()
    return list.map(parsePatternStats)
  },
}

export const sourceTypesAPI = {
  list: async (): Promise<SourceTypeStat[]> => {
    const list = await categoryStatisticsAPI.list()
    return list.map(parseSourceTypes)
  },
}

export const trendsAPI = {
  list: async (): Promise<TrendPoint[]> => {
    const list = await categoryStatisticsAPI.list()
    const grouped: Record<string, TrendPoint> = {}
    list.forEach((item) => {
      const date = item.last_updated.split(" ")[0]
      const messages = parseInt(item.message_types.match(/Total:\s*(\d+)/)?.[1] || "0")
      const patterns = parseInt(item.pattern_stats.match(/Pattern Matched:\s*(\d+)/)?.[1] || "0")
      const sources =
        parseInt(item.source_types.match(/Alphaname:\s*(\d+)/)?.[1] || "0") +
        parseInt(item.source_types.match(/Short Number:\s*(\d+)/)?.[1] || "0")
      if (!grouped[date]) {
        grouped[date] = { date, messages: 0, patterns: 0, sources: 0 }
      }
      grouped[date].messages += messages
      grouped[date].patterns += patterns
      grouped[date].sources += sources
    })
    return Object.values(grouped).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  },
}
