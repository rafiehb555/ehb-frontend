import api from './api'
import { ApiResponse } from '@/types/api'

export const walletService = {
  // Get wallet balance
  async getBalance(walletAddress: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/wallet/balance/${walletAddress}`)
    return response.data
  },

  // Get transaction history
  async getTransactionHistory(walletAddress: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/wallet/transactions/${walletAddress}`)
    return response.data
  },

  // Transfer EHBGC tokens
  async transferTokens(from: string, to: string, amount: number): Promise<ApiResponse> {
    const response = await api.post('/wallet/transfer', { from, to, amount })
    return response.data
  },

  // Lock tokens for validator
  async lockTokens(walletAddress: string, amount: number): Promise<ApiResponse> {
    const response = await api.post('/wallet/lock', { walletAddress, amount })
    return response.data
  },

  // Unlock tokens
  async unlockTokens(walletAddress: string, amount: number): Promise<ApiResponse> {
    const response = await api.post('/wallet/unlock', { walletAddress, amount })
    return response.data
  },

  // Get staking information
  async getStakingInfo(walletAddress: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/wallet/staking/${walletAddress}`)
    return response.data
  },

  // Stake tokens
  async stakeTokens(walletAddress: string, amount: number): Promise<ApiResponse> {
    const response = await api.post('/wallet/stake', { walletAddress, amount })
    return response.data
  },

  // Unstake tokens
  async unstakeTokens(walletAddress: string, amount: number): Promise<ApiResponse> {
    const response = await api.post('/wallet/unstake', { walletAddress, amount })
    return response.data
  },

  // Get rewards
  async getRewards(walletAddress: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/wallet/rewards/${walletAddress}`)
    return response.data
  },

  // Claim rewards
  async claimRewards(walletAddress: string): Promise<ApiResponse> {
    const response = await api.post('/wallet/claim-rewards', { walletAddress })
    return response.data
  },

  // Get validator status
  async getValidatorStatus(walletAddress: string): Promise<ApiResponse<any>> {
    const response = await api.get(`/wallet/validator-status/${walletAddress}`)
    return response.data
  }
}
