export class InsufficientPermissionError extends Error {
  constructor () {
    super('Permissão insuficiente para acessar este recurso')
    this.name = 'InsufficientPermissionError'
  }
}
