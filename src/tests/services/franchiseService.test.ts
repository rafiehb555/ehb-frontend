import { franchiseService } from '@/services/franchiseService'
import api from '@/services/api'

// Mock the api module
jest.mock('@/services/api', () => ({
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
}))

const mockApi = api as jest.Mocked<typeof api>

describe('franchiseService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('register', () => {
    it('should register a new franchise successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            id: '123',
            name: 'Test Franchise',
            email: 'test@example.com',
            type: 'sub',
            status: 'pending',
          },
          message: 'Franchise registered successfully',
        },
      }

      mockApi.post.mockResolvedValue(mockResponse)

      const franchiseData = {
        name: 'Test Franchise',
        email: 'test@example.com',
        password: 'password123',
        phone: '+1234567890',
        franchiseType: 'sub',
        territory: 'Test Territory',
        address: 'Test Address',
        walletAddress: '0x1234567890123456789012345678901234567890',
      }

      const result = await franchiseService.register(franchiseData)

      expect(mockApi.post).toHaveBeenCalledWith('/api/franchise/register', franchiseData)
      expect(result).toEqual(mockResponse.data)
    })

    it('should handle registration error', async () => {
      const mockError = {
        response: {
          data: {
            success: false,
            error: 'Email already exists',
          },
        },
      }

      mockApi.post.mockRejectedValue(mockError)

      const franchiseData = {
        name: 'Test Franchise',
        email: 'existing@example.com',
        password: 'password123',
        phone: '+1234567890',
        franchiseType: 'sub',
        territory: 'Test Territory',
        address: 'Test Address',
        walletAddress: '0x1234567890123456789012345678901234567890',
      }

      await expect(franchiseService.register(franchiseData)).rejects.toEqual(mockError)
    })
  })

  describe('getProfile', () => {
    it('should get franchise profile successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            id: '123',
            name: 'Test Franchise',
            email: 'test@example.com',
            type: 'sub',
            status: 'active',
          },
        },
      }

      mockApi.get.mockResolvedValue(mockResponse)

      const result = await franchiseService.getProfile('123')

      expect(mockApi.get).toHaveBeenCalledWith('/api/franchise/profile/123')
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('getEarnings', () => {
    it('should get franchise earnings successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            franchiseId: '123',
            totalEarnings: 1000,
            monthlyEarnings: 100,
            commissionRate: 0.02,
          },
        },
      }

      mockApi.get.mockResolvedValue(mockResponse)

      const result = await franchiseService.getEarnings('123')

      expect(mockApi.get).toHaveBeenCalledWith('/api/franchise/income/123')
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('getAllFranchises', () => {
    it('should get all franchises with pagination', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            data: [
              {
                id: '123',
                name: 'Franchise 1',
                type: 'sub',
              },
              {
                id: '456',
                name: 'Franchise 2',
                type: 'master',
              },
            ],
            pagination: {
              page: 1,
              limit: 10,
              total: 2,
              totalPages: 1,
            },
          },
        },
      }

      mockApi.get.mockResolvedValue(mockResponse)

      const result = await franchiseService.getAllFranchises(1, 10)

      expect(mockApi.get).toHaveBeenCalledWith('/api/franchise/all?page=1&limit=10')
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('suspendFranchise', () => {
    it('should suspend franchise successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Franchise suspended successfully',
        },
      }

      mockApi.patch.mockResolvedValue(mockResponse)

      const result = await franchiseService.suspendFranchise('123', 'Violation of terms')

      expect(mockApi.patch).toHaveBeenCalledWith('/api/franchise/suspend/123', {
        reason: 'Violation of terms',
      })
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('banFranchise', () => {
    it('should ban franchise successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Franchise banned successfully',
        },
      }

      mockApi.patch.mockResolvedValue(mockResponse)

      const result = await franchiseService.banFranchise('123', 'Serious violation')

      expect(mockApi.patch).toHaveBeenCalledWith('/api/franchise/ban/123', {
        reason: 'Serious violation',
      })
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('getDashboard', () => {
    it('should get franchise dashboard data', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            franchise: {
              id: '123',
              name: 'Test Franchise',
            },
            earnings: {
              totalEarnings: 1000,
              monthlyEarnings: 100,
            },
            recentComplaints: [],
            performanceMetrics: {
              totalOrders: 50,
              totalRevenue: 5000,
            },
          },
        },
      }

      mockApi.get.mockResolvedValue(mockResponse)

      const result = await franchiseService.getDashboard('123')

      expect(mockApi.get).toHaveBeenCalledWith('/api/franchise/dashboard/123')
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('getComplaints', () => {
    it('should get franchise complaints', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [
            {
              id: '1',
              title: 'Test Complaint',
              status: 'open',
            },
          ],
        },
      }

      mockApi.get.mockResolvedValue(mockResponse)

      const result = await franchiseService.getComplaints('123')

      expect(mockApi.get).toHaveBeenCalledWith('/api/franchise/complaints/123')
      expect(result).toEqual(mockResponse.data)
    })

    it('should get franchise complaints with status filter', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [
            {
              id: '1',
              title: 'Resolved Complaint',
              status: 'resolved',
            },
          ],
        },
      }

      mockApi.get.mockResolvedValue(mockResponse)

      const result = await franchiseService.getComplaints('123', 'resolved')

      expect(mockApi.get).toHaveBeenCalledWith('/api/franchise/complaints/123?status=resolved')
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('escalateComplaint', () => {
    it('should escalate complaint successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Complaint escalated successfully',
        },
      }

      mockApi.patch.mockResolvedValue(mockResponse)

      const result = await franchiseService.escalateComplaint('1', 'Unable to resolve')

      expect(mockApi.patch).toHaveBeenCalledWith('/api/franchise/escalate/1', {
        reason: 'Unable to resolve',
      })
      expect(result).toEqual(mockResponse.data)
    })
  })
})
