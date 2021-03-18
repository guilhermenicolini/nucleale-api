export class EmailInUseError extends Error {
  constructor () {
    super('Email already taken')
    this.name = 'EmailInUseError'
  }
}
