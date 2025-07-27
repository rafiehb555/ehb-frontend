import { ethers } from 'ethers'
import { BLOCKCHAIN_CONSTANTS } from '@/constants'

// Web3 provider setup
export const getProvider = (network: 'mainnet' | 'testnet' = 'mainnet') => {
  const rpcUrl = process.env.BLOCKCHAIN_RPC_URL || BLOCKCHAIN_CONSTANTS.NETWORKS.MAINNET.RPC_URL
  return new ethers.providers.JsonRpcProvider(rpcUrl)
}

// Contract ABI for EHBGC token
export const EHBGC_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
]

// Contract ABI for Trusty Wallet
export const TRUSTY_WALLET_ABI = [
  'function lockTokens(uint256 amount) returns (bool)',
  'function unlockTokens(uint256 amount) returns (bool)',
  'function stakeTokens(uint256 amount) returns (bool)',
  'function unstakeTokens(uint256 amount) returns (bool)',
  'function claimRewards() returns (bool)',
  'function getStakedAmount(address user) view returns (uint256)',
  'function getRewards(address user) view returns (uint256)',
  'function isValidator(address user) view returns (bool)',
  'event TokensLocked(address indexed user, uint256 amount)',
  'event TokensUnlocked(address indexed user, uint256 amount)',
  'event TokensStaked(address indexed user, uint256 amount)',
  'event TokensUnstaked(address indexed user, uint256 amount)',
  'event RewardsClaimed(address indexed user, uint256 amount)',
]

// Get contract instances
export const getEHBGCContract = (signer?: ethers.Signer) => {
  const contractAddress = process.env.EHBGC_CONTRACT_ADDRESS
  if (!contractAddress) {
    throw new Error('EHBGC contract address not configured')
  }

  const provider = getProvider()
  const contract = new ethers.Contract(contractAddress, EHBGC_ABI, signer || provider)
  return contract
}

export const getTrustyWalletContract = (signer?: ethers.Signer) => {
  const contractAddress = process.env.TRUSTY_WALLET_CONTRACT_ADDRESS
  if (!contractAddress) {
    throw new Error('Trusty Wallet contract address not configured')
  }

  const provider = getProvider()
  const contract = new ethers.Contract(contractAddress, TRUSTY_WALLET_ABI, signer || provider)
  return contract
}

// Wallet balance functions
export const getWalletBalance = async (address: string): Promise<string> => {
  try {
    const contract = getEHBGCContract()
    const balance = await contract.balanceOf(address)
    return ethers.utils.formatEther(balance)
  } catch (error) {
    console.error('Error getting wallet balance:', error)
    throw new Error('Failed to get wallet balance')
  }
}

export const getStakedAmount = async (address: string): Promise<string> => {
  try {
    const contract = getTrustyWalletContract()
    const stakedAmount = await contract.getStakedAmount(address)
    return ethers.utils.formatEther(stakedAmount)
  } catch (error) {
    console.error('Error getting staked amount:', error)
    throw new Error('Failed to get staked amount')
  }
}

export const getRewards = async (address: string): Promise<string> => {
  try {
    const contract = getTrustyWalletContract()
    const rewards = await contract.getRewards(address)
    return ethers.utils.formatEther(rewards)
  } catch (error) {
    console.error('Error getting rewards:', error)
    throw new Error('Failed to get rewards')
  }
}

// Transaction functions
export const transferTokens = async (
  fromAddress: string,
  toAddress: string,
  amount: string,
  privateKey: string
): Promise<ethers.providers.TransactionReceipt> => {
  try {
    const provider = getProvider()
    const wallet = new ethers.Wallet(privateKey, provider)
    const contract = getEHBGCContract(wallet)

    const amountWei = ethers.utils.parseEther(amount)
    const tx = await contract.transfer(toAddress, amountWei)
    return await tx.wait()
  } catch (error) {
    console.error('Error transferring tokens:', error)
    throw new Error('Failed to transfer tokens')
  }
}

export const lockTokens = async (
  address: string,
  amount: string,
  privateKey: string
): Promise<ethers.providers.TransactionReceipt> => {
  try {
    const provider = getProvider()
    const wallet = new ethers.Wallet(privateKey, provider)
    const contract = getTrustyWalletContract(wallet)

    const amountWei = ethers.utils.parseEther(amount)
    const tx = await contract.lockTokens(amountWei)
    return await tx.wait()
  } catch (error) {
    console.error('Error locking tokens:', error)
    throw new Error('Failed to lock tokens')
  }
}

export const unlockTokens = async (
  address: string,
  amount: string,
  privateKey: string
): Promise<ethers.providers.TransactionReceipt> => {
  try {
    const provider = getProvider()
    const wallet = new ethers.Wallet(privateKey, provider)
    const contract = getTrustyWalletContract(wallet)

    const amountWei = ethers.utils.parseEther(amount)
    const tx = await contract.unlockTokens(amountWei)
    return await tx.wait()
  } catch (error) {
    console.error('Error unlocking tokens:', error)
    throw new Error('Failed to unlock tokens')
  }
}

export const stakeTokens = async (
  address: string,
  amount: string,
  privateKey: string
): Promise<ethers.providers.TransactionReceipt> => {
  try {
    const provider = getProvider()
    const wallet = new ethers.Wallet(privateKey, provider)
    const contract = getTrustyWalletContract(wallet)

    const amountWei = ethers.utils.parseEther(amount)
    const tx = await contract.stakeTokens(amountWei)
    return await tx.wait()
  } catch (error) {
    console.error('Error staking tokens:', error)
    throw new Error('Failed to stake tokens')
  }
}

export const unstakeTokens = async (
  address: string,
  amount: string,
  privateKey: string
): Promise<ethers.providers.TransactionReceipt> => {
  try {
    const provider = getProvider()
    const wallet = new ethers.Wallet(privateKey, provider)
    const contract = getTrustyWalletContract(wallet)

    const amountWei = ethers.utils.parseEther(amount)
    const tx = await contract.unstakeTokens(amountWei)
    return await tx.wait()
  } catch (error) {
    console.error('Error unstaking tokens:', error)
    throw new Error('Failed to unstake tokens')
  }
}

export const claimRewards = async (
  address: string,
  privateKey: string
): Promise<ethers.providers.TransactionReceipt> => {
  try {
    const provider = getProvider()
    const wallet = new ethers.Wallet(privateKey, provider)
    const contract = getTrustyWalletContract(wallet)

    const tx = await contract.claimRewards()
    return await tx.wait()
  } catch (error) {
    console.error('Error claiming rewards:', error)
    throw new Error('Failed to claim rewards')
  }
}

// Validator functions
export const isValidator = async (address: string): Promise<boolean> => {
  try {
    const contract = getTrustyWalletContract()
    return await contract.isValidator(address)
  } catch (error) {
    console.error('Error checking validator status:', error)
    return false
  }
}

export const checkValidatorRequirements = async (
  address: string,
  sqlLevel: string,
  franchiseType: string
): Promise<{ isEligible: boolean; requirements: string[] }> => {
  const requirements = []

  // Check SQL level
  if (sqlLevel !== BLOCKCHAIN_CONSTANTS.VALIDATOR_REQUIREMENTS.MIN_SQL_LEVEL) {
    requirements.push(`SQL level must be ${BLOCKCHAIN_CONSTANTS.VALIDATOR_REQUIREMENTS.MIN_SQL_LEVEL}`)
  }

  // Check franchise type
  if (franchiseType !== BLOCKCHAIN_CONSTANTS.VALIDATOR_REQUIREMENTS.MIN_FRANCHISE_TYPE) {
    requirements.push(`Franchise type must be ${BLOCKCHAIN_CONSTANTS.VALIDATOR_REQUIREMENTS.MIN_FRANCHISE_TYPE}`)
  }

  // Check staked amount
  try {
    const stakedAmount = await getStakedAmount(address)
    const minStake = BLOCKCHAIN_CONSTANTS.VALIDATOR_REQUIREMENTS.MIN_STAKE
    if (parseFloat(stakedAmount) < minStake) {
      requirements.push(`Minimum stake required: ${minStake} EHBGC tokens`)
    }
  } catch (error) {
    requirements.push('Unable to verify staked amount')
  }

  return {
    isEligible: requirements.length === 0,
    requirements
  }
}

// Gas estimation
export const estimateGas = async (
  functionName: string,
  params: any[]
): Promise<string> => {
  try {
    const provider = getProvider()
    const contract = getTrustyWalletContract()

    const gasLimit = await contract.estimateGas[functionName](...params)
    return gasLimit.toString()
  } catch (error) {
    console.error('Error estimating gas:', error)
    // Return default gas limit based on function
    const defaultGasLimits: Record<string, number> = {
      lockTokens: BLOCKCHAIN_CONSTANTS.GAS_LIMITS.STAKE,
      unlockTokens: BLOCKCHAIN_CONSTANTS.GAS_LIMITS.UNSTAKE,
      stakeTokens: BLOCKCHAIN_CONSTANTS.GAS_LIMITS.STAKE,
      unstakeTokens: BLOCKCHAIN_CONSTANTS.GAS_LIMITS.UNSTAKE,
      claimRewards: BLOCKCHAIN_CONSTANTS.GAS_LIMITS.CLAIM_REWARDS,
    }

    return (defaultGasLimits[functionName] || 100000).toString()
  }
}

// Network utilities
export const getNetworkInfo = async () => {
  try {
    const provider = getProvider()
    const network = await provider.getNetwork()
    const gasPrice = await provider.getGasPrice()

    return {
      chainId: network.chainId,
      name: network.name,
      gasPrice: ethers.utils.formatUnits(gasPrice, 'gwei'),
    }
  } catch (error) {
    console.error('Error getting network info:', error)
    throw new Error('Failed to get network information')
  }
}

// Address validation
export const isValidAddress = (address: string): boolean => {
  return ethers.utils.isAddress(address)
}

export const formatAddress = (address: string): string => {
  if (!isValidAddress(address)) {
    throw new Error('Invalid address')
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Transaction utilities
export const getTransactionStatus = async (txHash: string): Promise<string> => {
  try {
    const provider = getProvider()
    const receipt = await provider.getTransactionReceipt(txHash)

    if (!receipt) {
      return 'pending'
    }

    return receipt.status === 1 ? 'confirmed' : 'failed'
  } catch (error) {
    console.error('Error getting transaction status:', error)
    return 'unknown'
  }
}

export const getTransactionHistory = async (address: string): Promise<any[]> => {
  try {
    const provider = getProvider()
    const contract = getEHBGCContract()

    // Get Transfer events for the address
    const filter = contract.filters.Transfer(null, address)
    const events = await contract.queryFilter(filter)

    return events.map(event => ({
      hash: event.transactionHash,
      from: event.args?.from,
      to: event.args?.to,
      value: ethers.utils.formatEther(event.args?.value || 0),
      blockNumber: event.blockNumber,
    }))
  } catch (error) {
    console.error('Error getting transaction history:', error)
    throw new Error('Failed to get transaction history')
  }
}
