export class InvalidParamError extends Error {
  constructor (param: string) {
    super(`Parâmetro inválido: ${param}`)
    this.name = 'InvalidParamError'
  }
}
