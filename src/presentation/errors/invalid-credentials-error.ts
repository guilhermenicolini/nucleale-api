export class InvalidStatusError extends Error {
  constructor () {
    super('Invalid status')
    this.name = 'InvalidStatusError'
  }
}
