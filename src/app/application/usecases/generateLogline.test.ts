// 1. mock loglineApi 模块
jest.mock('@/app/infrastructure/api/loglineApi', () => ({
  fetchLogline: jest.fn(),
}))

import { generateLogline } from './generateLogline'
import { fetchLogline } from '@/app/infrastructure/api/loglineApi'

describe('generateLogline', () => {
  it('should return logline list on success', async () => {
    const mockResult = [{ logline: 'a', protagonist: '', objective: '', conflict: '', genre: '', style: '', tone: '', explanation: '' }]
    ;(fetchLogline as jest.Mock).mockResolvedValueOnce(mockResult)
    const result = await generateLogline('idea')
    expect(result).toEqual(mockResult)
  })

  it('should throw on api error', async () => {
    ;(fetchLogline as jest.Mock).mockRejectedValueOnce(new Error('fail'))
    await expect(generateLogline('idea')).rejects.toThrow('fail')
  })
}) 