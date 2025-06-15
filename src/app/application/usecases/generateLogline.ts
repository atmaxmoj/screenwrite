import { fetchLogline } from '@/app/infrastructure/api/loglineApi'
import type { Logline } from '@/app/domain/models/logline'

/**
 * 用例：生成 logline
 * @param idea 用户输入的剧本想法
 * @returns Promise<Logline[]> 所有 logline 结果
 */
export async function generateLogline(idea: string): Promise<Logline[]> {
  return fetchLogline(idea)
} 