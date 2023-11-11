import { createLogger, transports, format } from 'winston'
const { combine, timestamp, printf } = format

export enum ELogType {
  error = 'error',
  login = 'login'
}

export class LoggingService {
  private logger

  constructor(private readonly logType: ELogType) {
    const now = new Date()
    const year = now.getFullYear()
    const month = `0${now.getMonth() + 1}`.slice(-2) // Adding 1 to month as it's zero-based
    const day = `0${now.getDate()}`.slice(-2)
    const dayOfWeek = now.toDateString().slice(0, 3)
    const logFileName = `${year}-${month}-${day}-${dayOfWeek}.${this.logType}.log`
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
          filename: `logs/${this.logType}/${logFileName}`,
          level: 'error'
        })
      ]
    })
  }

  log(error: string) {
    this.logger.error(error)
  }
}
