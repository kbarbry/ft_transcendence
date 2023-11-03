import { createLogger, transports, format } from 'winston'

const { combine, timestamp, printf } = format

export class LoggingService {
  private logger

  constructor() {
    this.logger = createLogger({
      level: 'error',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(({ level, message, timestamp }) => {
          return `${timestamp} ${level}: ${message}`
        })
      ),
      transports: [
        new transports.File({
          filename: `logs/${new Date().toDateString()}.log`,
          level: 'error'
        })
      ]
    })
  }

  logError(error: string) {
    this.logger.error(error)
  }
}
