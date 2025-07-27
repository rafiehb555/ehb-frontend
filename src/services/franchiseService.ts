import api from './api'
import { Franchise, FranchiseRegistration, FranchiseEarnings, Complaint } from '@/types/franchise'
import { ApiResponse, PaginatedResponse } from '@/types/api'

export const franchiseService = {
  // Register new franchise
  async register(data: FranchiseRegistration): Promise<ApiResponse<Franchise>> {
    const response = await api.post('/franchise/register', data)
    return response.data
  },

  // Get franchise profile
  async getProfile(id: string): Promise<ApiResponse<Franchise>> {
    const response = await api.get(`/franchise/profile/${id}`)
    return response.data
  },

  // Update franchise profile
  async updateProfile(id: string, data: Partial<Franchise>): Promise<ApiResponse<Franchise>> {
    const response = await api.put(`/franchise/profile/${id}`, data)
    return response.data
  },

  // Get franchise earnings
  async getEarnings(franchiseId: string): Promise<ApiResponse<FranchiseEarnings>> {
    const response = await api.get(`/franchise/income/${franchiseId}`)
    return response.data
  },

  // Get all franchises (admin only)
  async getAllFranchises(page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<Franchise>>> {
    const response = await api.get(`/franchise/all?page=${page}&limit=${limit}`)
    return response.data
  },

  // Verify sub-franchise
  async verifySubFranchise(franchiseId: string, subFranchiseId: string): Promise<ApiResponse> {
    const response = await api.put(`/franchise/verify-sub`, { franchiseId, subFranchiseId })
    return response.data
  },

  // Suspend franchise
  async suspendFranchise(franchiseId: string, reason: string): Promise<ApiResponse> {
    const response = await api.patch(`/franchise/suspend/${franchiseId}`, { reason })
    return response.data
  },

  // Ban franchise
  async banFranchise(franchiseId: string, reason: string): Promise<ApiResponse> {
    const response = await api.patch(`/franchise/ban/${franchiseId}`, { reason })
    return response.data
  },

  // Get franchise dashboard
  async getDashboard(franchiseId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/franchise/dashboard/${franchiseId}`)
    return response.data
  },

  // Get franchise complaints
  async getComplaints(franchiseId: string, status?: string): Promise<ApiResponse<Complaint[]>> {
    const params = status ? `?status=${status}` : ''
    const response = await api.get(`/franchise/complaints/${franchiseId}${params}`)
    return response.data
  },

  // Escalate complaint
  async escalateComplaint(complaintId: string, reason: string): Promise<ApiResponse> {
    const response = await api.patch(`/franchise/escalate/${complaintId}`, { reason })
    return response.data
  },

  // Get franchise map data
  async getFranchiseMap(): Promise<ApiResponse<any>> {
    const response = await api.get('/franchise/map')
    return response.data
  },

  // Get franchise statistics
  async getStatistics(franchiseId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/franchise/statistics/${franchiseId}`)
    return response.data
  }
}
