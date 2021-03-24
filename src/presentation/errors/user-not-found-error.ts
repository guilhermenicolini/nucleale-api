export class UserNotFoundError extends Error {
  constructor () {
    super('Invalid email or password')
    this.name = 'UserNotFoundError'
  }
}
