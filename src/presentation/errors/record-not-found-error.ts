export class RecordNotFoundError extends Error {
  constructor (model: string) {
    super(`${model} not found`)
    this.name = 'RecordNotFoundError'
  }
}
