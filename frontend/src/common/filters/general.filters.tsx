export class LogError extends Error {
  public _type: string
  public _isFatal: boolean
  public _canRetry: boolean

  constructor(
    message: string,
    type: string,
    isFatal: boolean,
    canRetry: boolean
  ) {
    super(message)
    console.log(message)
    this.name = message
    this._type = type
    this._isFatal = isFatal
    this._canRetry = canRetry
  }
}
