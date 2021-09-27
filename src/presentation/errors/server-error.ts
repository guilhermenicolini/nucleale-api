export class ServerError extends Error {
  constructor (stack: string) {
    super('Erro Interno do Servidor')
    this.name = 'ServerError'
    this.stack = stack
  }
}
