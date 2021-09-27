export class EmailInUseError extends Error {
  constructor () {
    super('E-mail já registrado')
    this.name = 'EmailInUseError'
  }
}
