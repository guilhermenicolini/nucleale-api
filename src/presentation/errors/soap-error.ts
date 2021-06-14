export class SoapError extends Error {
  constructor (description: string) {
    super(description)
    this.name = 'SoapError'
  }
}
