import type { Character } from '@/app/domain/models/character'
import { API_BASE_URL } from '@/app/infrastructure/constants/api'
import { getJWT } from '@/app/infrastructure/utils/jwt'
import type { Logline } from '@/app/domain/models/logline'

/**
 * 调用后端 /api/v1/character，生成角色设定
 * @param logline 上一步生成的 logline 对象
 * @param idea 用户输入的 idea
 * @returns Promise<Character[]> 所有角色设定
 */
export async function fetchCharacter(logline: Logline, idea: string): Promise<Character[]> {
  const jwt = getJWT()
  const res = await fetch(`${API_BASE_URL}/api/v1/character`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({ data: { logline, idea } }),
  })
  if (!res.ok) {
    throw new Error('Failed to generate character')
  }
  const data = await res.json()
  // 返回 output 数组，类型为 Character[]
  return Array.isArray(data.output) ? data.output : []
} 