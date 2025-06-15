import type { Logline } from '@/app/domain/models/logline'
import { API_BASE_URL } from '@/app/infrastructure/constants/api'
import { getJWT } from '@/app/infrastructure/utils/jwt'

/**
 * 调用后端 /api/v1/logline，生成剧本梗概
 * @param idea 用户输入的剧本想法
 * @returns Promise<Logline[]> 所有 logline 结果
 */
export async function fetchLogline(idea: string): Promise<Logline[]> {
  const jwt = getJWT()
  const res = await fetch(`${API_BASE_URL}/api/v1/logline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({ data: { idea } }),
  })
  if (!res.ok) {
    throw new Error('Failed to generate logline')
  }
  const data = await res.json()
  // 返回 output 数组，类型为 Logline[]
  return Array.isArray(data.output) ? data.output : []
} 