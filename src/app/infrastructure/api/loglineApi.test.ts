process.env.NEXT_PUBLIC_JWT_SECRET = 'test_secret'
import { fetchLogline } from './loglineApi'

// 断言 fetch 为 jest.Mock 类型
global.fetch = jest.fn() as jest.Mock

describe('fetchLogline', () => {
  afterEach(() => { jest.clearAllMocks() })

  it('should return output array on success', async () => {
    const mockOutput = [{ logline: 'a', protagonist: '', objective: '', conflict: '', genre: '', style: '', tone: '', explanation: '' }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({ output: mockOutput }) })
    const result = await fetchLogline('idea')
    expect(result).toEqual(mockOutput)
  })

  it('should return [] if output is not array', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({ output: null }) })
    const result = await fetchLogline('idea')
    expect(result).toEqual([])
  })

  it('should throw if not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false })
    await expect(fetchLogline('idea')).rejects.toThrow('Failed to generate logline')
  })
}) 