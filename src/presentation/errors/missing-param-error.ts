export class MissingParamError extends Error {
  constructor (param: string) {
    super(`Parâmetro não encontrado: ${param}`)
    this.name = 'MissingParamError'
  }
}
