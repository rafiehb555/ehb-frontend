import api from './api'
import { Complaint } from '@/types/franchise'
import { ApiResponse, ComplaintRequest, EscalationRequest } from '@/types/api'

export const complaintService = {
  // Create new complaint
  async createComplaint(data: ComplaintRequest): Promise<ApiResponse<Complaint>> {
    const response = await api.post('/complaints', data)
    return response.data
  },

  // Get complaint by ID
  async getComplaint(id: string): Promise<ApiResponse<Complaint>> {
    const response = await api.get(`/complaints/${id}`)
    return response.data
  },

  // Get all complaints for a franchise
  async getFranchiseComplaints(franchiseId: string, status?: string): Promise<ApiResponse<Complaint[]>> {
    const params = status ? `?status=${status}` : ''
    const response = await api.get(`/complaints/franchise/${franchiseId}${params}`)
    return response.data
  },

  // Update complaint status
  async updateComplaintStatus(id: string, status: string, resolution?: string): Promise<ApiResponse<Complaint>> {
    const response = await api.patch(`/complaints/${id}/status`, { status, resolution })
    return response.data
  },

  // Escalate complaint
  async escalateComplaint(data: EscalationRequest): Promise<ApiResponse> {
    const response = await api.post('/complaints/escalate', data)
    return response.data
  },

  // Get complaint statistics
  async getComplaintStatistics(franchiseId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/complaints/statistics/${franchiseId}`)
    return response.data
  },

  // Get escalated complaints
  async getEscalatedComplaints(franchiseId: string): Promise<ApiResponse<Complaint[]>> {
    const response = await api.get(`/complaints/escalated/${franchiseId}`)
    return response.data
  },

  // Add comment to complaint
  async addComment(complaintId: string, comment: string): Promise<ApiResponse> {
    const response = await api.post(`/complaints/${complaintId}/comments`, { comment })
    return response.data
  },

  // Get complaint timeline
  async getComplaintTimeline(complaintId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/complaints/${complaintId}/timeline`)
    return response.data
  }
}
