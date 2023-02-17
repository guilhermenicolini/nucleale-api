export class ServerError extends Error {
  private readonly innerError: Error

  constructor (error: Error) {
    super('Erro Interno do Servidor')
    this.name = 'ServerError'
    this.innerError = error
  }

  toJSON (): string {
    return `${this.message}. Inner error: ${this.innerError?.message as string}. Inner stack: ${this.innerError.stack}`
  }
}
