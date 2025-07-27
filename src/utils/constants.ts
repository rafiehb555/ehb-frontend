// API Constants
export const API_ENDPOINTS = {
  FRANCHISE: {
    REGISTER: '/api/franchise/register',
    PROFILE: '/api/franchise/profile',
    EARNINGS: '/api/franchise/income',
    DASHBOARD: '/api/franchise/dashboard',
    ALL: '/api/franchise/all',
    VERIFY_SUB: '/api/franchise/verify-sub',
    SUSPEND: '/api/franchise/suspend',
    BAN: '/api/franchise/ban',
    COMPLAINTS: '/api/franchise/complaints',
    ESCALATE: '/api/franchise/escalate',
    MAP: '/api/franchise/map',
    STATISTICS: '/api/franchise/statistics',
  },
  COMPLAINTS: {
    CREATE: '/api/complaints',
    GET: '/api/complaints',
    UPDATE_STATUS: '/api/complaints/status',
    ESCALATE: '/api/complaints/escalate',
    STATISTICS: '/api/complaints/statistics',
    ESCALATED: '/api/complaints/escalated',
    COMMENTS: '/api/complaints/comments',
    TIMELINE: '/api/complaints/timeline',
  },
  WALLET: {
    BALANCE: '/api/wallet/balance',
    TRANSACTIONS: '/api/wallet/transactions',
    TRANSFER: '/api/wallet/transfer',
    LOCK: '/api/wallet/lock',
    UNLOCK: '/api/wallet/unlock',
    STAKING: '/api/wallet/staking',
    STAKE: '/api/wallet/stake',
    UNSTAKE: '/api/wallet/unstake',
    REWARDS: '/api/wallet/rewards',
    CLAIM_REWARDS: '/api/wallet/claim-rewards',
    VALIDATOR_STATUS: '/api/wallet/validator-status',
  },
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    VERIFY: '/api/auth/verify',
  },
} as const

// Franchise Constants
export const FRANCHISE_CONSTANTS = {
  COMMISSION_RATES: {
    SUB_FRANCHISE: { MIN: 0.01, MAX: 0.02 }, // 1-2%
    MASTER_FRANCHISE: { MIN: 0.005, MAX: 0.01 }, // 0.5-1%
    CORPORATE_FRANCHISE: { MIN: 0.005, MAX: 0.005 }, // 0.5%
  },
  COMPLAINT_DEADLINE_HOURS: 6,
  SQL_LEVELS: {
    LOW: { MIN_SCORE: 0, MAX_SCORE: 30 },
    MEDIUM: { MIN_SCORE: 31, MAX_SCORE: 70 },
    HIGH: { MIN_SCORE: 71, MAX_SCORE: 90 },
    VIP: { MIN_SCORE: 91, MAX_SCORE: 100 },
  },
  TERRITORY_LIMITS: {
    SUB_FRANCHISE: { MAX_SUB_FRANCHISES: 0 },
    MASTER_FRANCHISE: { MIN_SUB_FRANCHISES: 10, MAX_SUB_FRANCHISES: 25 },
    CORPORATE_FRANCHISE: { MIN_MASTER_FRANCHISES: 5, MAX_MASTER_FRANCHISES: 50 },
  },
} as const

// Blockchain Constants
export const BLOCKCHAIN_CONSTANTS = {
  NETWORKS: {
    MAINNET: {
      CHAIN_ID: 1,
      RPC_URL: 'https://mainnet.infura.io/v3/',
      EXPLORER: 'https://etherscan.io',
    },
    TESTNET: {
      CHAIN_ID: 5, // Goerli
      RPC_URL: 'https://goerli.infura.io/v3/',
      EXPLORER: 'https://goerli.etherscan.io',
    },
  },
  GAS_LIMITS: {
    TRANSFER: 21000,
    STAKE: 100000,
    UNSTAKE: 100000,
    CLAIM_REWARDS: 50000,
  },
  VALIDATOR_REQUIREMENTS: {
    MIN_STAKE: 1000, // EHBGC tokens
    MIN_SQL_LEVEL: 'high',
    MIN_FRANCHISE_TYPE: 'master',
  },
} as const

// UI Constants
export const UI_CONSTANTS = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
  ANIMATION: {
    DURATION: 300,
    EASING: 'ease-in-out',
  },
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1280,
  },
  COLORS: {
    PRIMARY: '#3b82f6',
    SECONDARY: '#64748b',
    SUCCESS: '#22c55e',
    WARNING: '#f59e0b',
    DANGER: '#ef4444',
  },
} as const

// Validation Constants
export const VALIDATION_CONSTANTS = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true,
  },
  EMAIL: {
    MAX_LENGTH: 254,
  },
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 15,
  },
  TERRITORY: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
  },
  ADDRESS: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 500,
  },
  WALLET_ADDRESS: {
    LENGTH: 42, // 0x + 40 hex characters
  },
} as const

// Error Messages
export const ERROR_MESSAGES = {
  VALIDATION: {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_WALLET: 'Please enter a valid wallet address',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
    PASSWORD_REQUIREMENTS: 'Password must contain uppercase, lowercase, number, and special character',
    TERRITORY_TOO_SHORT: 'Territory name must be at least 3 characters',
    TERRITORY_TOO_LONG: 'Territory name must be less than 100 characters',
  },
  API: {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied.',
    NOT_FOUND: 'Resource not found.',
    VALIDATION_ERROR: 'Please check your input and try again.',
  },
  FRANCHISE: {
    ALREADY_EXISTS: 'A franchise with this email already exists.',
    INVALID_TYPE: 'Invalid franchise type.',
    INVALID_TERRITORY: 'This territory is already assigned.',
    INSUFFICIENT_PERMISSIONS: 'You do not have permission to perform this action.',
  },
  COMPLAINT: {
    DEADLINE_EXCEEDED: 'Complaint deadline has been exceeded.',
    ALREADY_RESOLVED: 'This complaint has already been resolved.',
    INVALID_STATUS: 'Invalid complaint status.',
  },
  WALLET: {
    INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction.',
    INVALID_ADDRESS: 'Invalid wallet address.',
    TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  },
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  FRANCHISE: {
    REGISTERED: 'Franchise registered successfully!',
    UPDATED: 'Franchise profile updated successfully!',
    VERIFIED: 'Franchise verified successfully!',
  },
  COMPLAINT: {
    CREATED: 'Complaint created successfully!',
    RESOLVED: 'Complaint resolved successfully!',
    ESCALATED: 'Complaint escalated successfully!',
  },
  WALLET: {
    TRANSFER_SUCCESS: 'Transfer completed successfully!',
    STAKE_SUCCESS: 'Tokens staked successfully!',
    UNSTAKE_SUCCESS: 'Tokens unstaked successfully!',
    CLAIM_SUCCESS: 'Rewards claimed successfully!',
  },
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  FRANCHISE_ID: 'franchiseId',
  THEME: 'theme',
  LANGUAGE: 'language',
  PREFERENCES: 'preferences',
} as const

// Session Storage Keys
export const SESSION_KEYS = {
  CART: 'cart',
  FORM_DATA: 'formData',
  TEMP_DATA: 'tempData',
} as const

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const
