export class InsufficientPermissionError extends Error {
  constructor () {
    super('Insufficient permission to access this resource')
    this.name = 'InsufficientPermissionError'
  }
}
