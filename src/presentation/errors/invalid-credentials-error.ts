export class InvalidCredentialsError extends Error {
  constructor () {
    super('Usuário ou senha inválida')
    this.name = 'InvalidCredentialsError'
  }
}
