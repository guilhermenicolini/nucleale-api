import { AccessDeniedError, InsufficientPermissionError, InvalidCredentialsError, RecordNotFoundError, ServerError } from '@/presentation/errors'
import { handleError as sut, serverError, badRequest, unauthorized, forbidden, notFound } from '@/presentation/helpers'

describe('Error Helper', () => {
  test('Should return badRequest on default', async () => {
    const error = new Error('any_error')
    const result = sut(error)
    expect(result).toEqual(badRequest(error))
  })

  test('Should return serverError on ServerError', async () => {
    const error = new ServerError('any_error')
    const result = sut(error)
    expect(result).toEqual(serverError(error))
  })

  test('Should return unauthorized on AccessDeniedError', async () => {
    const error = new AccessDeniedError()
    const result = sut(error)
    expect(result).toEqual(unauthorized(error))
  })

  test('Should return unauthorized on InvalidCredentialsError', async () => {
    const error = new InvalidCredentialsError()
    const result = sut(error)
    expect(result).toEqual(unauthorized(error))
  })

  test('Should return forbidden on InsufficientPermissionError', async () => {
    const error = new InsufficientPermissionError()
    const result = sut(error)
    expect(result).toEqual(forbidden(error))
  })

  test('Should return notFound on RecordNotFoundError', async () => {
    const error = new RecordNotFoundError('any_error')
    const result = sut(error)
    expect(result).toEqual(notFound(error))
  })
})
