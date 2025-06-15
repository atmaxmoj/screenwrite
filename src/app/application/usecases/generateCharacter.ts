import { fetchCharacter } from '@/app/infrastructure/api/characterApi'
import type { Logline } from '@/app/domain/models/logline'
import type { Character } from '@/app/domain/models/character'

/**
 * 用例：生成角色设定
 * @param logline Logline 对象
 * @param idea 用户输入的 idea
 * @returns Promise<Character[]> 角色数组
 */
export async function generateCharacter(logline: Logline, idea: string): Promise<Character[]> {
  return fetchCharacter(logline, idea)
} 