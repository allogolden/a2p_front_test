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
  list: async (from?: string, to?: string): Promise<MessageTypeStat[]> => {
    const list = await categoryStatisticsAPI.list(from, to)
    return list.map(parseMessageTypes)
  },
}

export const patternStatsAPI = {
  list: async (from?: string, to?: string): Promise<PatternStat[]> => {
    const list = await categoryStatisticsAPI.list(from, to)
    return list.map(parsePatternStats)
  },
}

export const sourceTypesAPI = {
  list: async (from?: string, to?: string): Promise<SourceTypeStat[]> => {
    const list = await categoryStatisticsAPI.list(from, to)
    return list.map(parseSourceTypes)
  },
}

export const trendsAPI = {
  list: async (from?: string, to?: string): Promise<TrendPoint[]> => {
    const start = from ? new Date(from) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const end = to ? new Date(to) : new Date()

    const points: TrendPoint[] = []
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const messages = Math.floor(Math.random() * 400) + 50
      const patterns = Math.floor(messages * 0.8)
      const sources = Math.floor(messages * 0.5)
      points.push({
        date: d.toISOString().split('T')[0],
        messages,
        patterns,
        sources,
      })
    }

    return Promise.resolve(points)
  },
}
