export class ApplicationError extends Error {
  statusCode: number
  errCode: string

  constructor(message: string, statusCode: number, errCode: string) {
    super(message)
    this.errCode = errCode
    this.statusCode = statusCode
  }
}
