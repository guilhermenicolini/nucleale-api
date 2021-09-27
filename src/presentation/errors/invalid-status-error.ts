export class InvalidStatusError extends Error {
  constructor () {
    super('Status inválido')
    this.name = 'InvalidStatusError'
  }
}
