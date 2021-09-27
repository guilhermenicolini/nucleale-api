export class RecordNotFoundError extends Error {
  constructor (model: string) {
    super(`${model} não encontrado`)
    this.name = 'RecordNotFoundError'
  }
}
