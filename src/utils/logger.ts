enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

class Logger {
  private level: LogLevel

  constructor() {
    this.level = process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.level
  }

  private formatMessage(level: string, message: string, data?: any): string {
    const timestamp = new Date().toISOString()
    const prefix = `[${timestamp}] [${level}]`

    if (data) {
      return `${prefix} ${message} ${JSON.stringify(data, null, 2)}`
    }

    return `${prefix} ${message}`
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatMessage('DEBUG', message, data))
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.formatMessage('INFO', message, data))
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage('WARN', message, data))
    }
  }

  error(message: string, error?: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage('ERROR', message, error))
    }
  }

  // API request logging
  logApiRequest(method: string, url: string, data?: any): void {
    this.info(`API Request: ${method} ${url}`, data)
  }

  logApiResponse(method: string, url: string, status: number, data?: any): void {
    const level = status >= 400 ? 'ERROR' : 'INFO'
    this.info(`API Response: ${method} ${url} - ${status}`, data)
  }

  // Database logging
  logDbQuery(operation: string, collection: string, query?: any): void {
    this.debug(`DB Query: ${operation} on ${collection}`, query)
  }

  logDbError(operation: string, collection: string, error: any): void {
    this.error(`DB Error: ${operation} on ${collection}`, error)
  }

  // Franchise operations logging
  logFranchiseOperation(operation: string, franchiseId: string, data?: any): void {
    this.info(`Franchise ${operation}: ${franchiseId}`, data)
  }

  logComplaintOperation(operation: string, complaintId: string, data?: any): void {
    this.info(`Complaint ${operation}: ${complaintId}`, data)
  }

  // Blockchain operations logging
  logBlockchainOperation(operation: string, address: string, data?: any): void {
    this.info(`Blockchain ${operation}: ${address}`, data)
  }

  // Performance logging
  logPerformance(operation: string, duration: number): void {
    this.info(`Performance: ${operation} took ${duration}ms`)
  }

  // Security logging
  logSecurityEvent(event: string, userId?: string, data?: any): void {
    this.warn(`Security Event: ${event}`, { userId, ...data })
  }

  // Error logging with stack trace
  logErrorWithStack(message: string, error: Error): void {
    this.error(message, {
      name: error.name,
      message: error.message,
      stack: error.stack,
    })
  }

  // Set log level
  setLevel(level: LogLevel): void {
    this.level = level
  }

  // Get current log level
  getLevel(): LogLevel {
    return this.level
  }
}

// Create singleton instance
const logger = new Logger()

export default logger
export { LogLevel }
