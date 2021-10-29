import { AccessDeniedError, ClientError, EmailInUseError, InsufficientPermissionError, InvalidCredentialsError, InvalidParamError, InvalidStatusError, MissingParamError, RecordNotFoundError, SoapError } from '@/presentation/errors'
import { handleError as sut, serverError, badRequest, unauthorized, forbidden, notFound } from '@/presentation/helpers'

describe('Error Helper', () => {
  describe('serverError()', () => {
    test('Should return serverError on default', async () => {
      const error = new Error('any_error')
      const result = sut(error)
      expect(result).toEqual(serverError(error))
    })
  })

  describe('unauthorized()', () => {
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
  })

  describe('forbidden()', () => {
    test('Should return forbidden on InsufficientPermissionError', async () => {
      const error = new InsufficientPermissionError()
      const result = sut(error)
      expect(result).toEqual(forbidden(error))
    })
  })

  describe('notFound()', () => {
    test('Should return notFound on RecordNotFoundError', async () => {
      const error = new RecordNotFoundError('any_error')
      const result = sut(error)
      expect(result).toEqual(notFound(error))
    })
  })

  describe('badRequest()', () => {
    test('Should return badRequest on ClientError', async () => {
      const error = new ClientError('any_error')
      const result = sut(error)
      expect(result).toEqual(badRequest(error))
    })

    test('Should return badRequest on EmailInUseError', async () => {
      const error = new EmailInUseError()
      const result = sut(error)
      expect(result).toEqual(badRequest(error))
    })

    test('Should return badRequest on InvalidParamError', async () => {
      const error = new InvalidParamError('ant_param')
      const result = sut(error)
      expect(result).toEqual(badRequest(error))
    })

    test('Should return badRequest on InvalidStatusError', async () => {
      const error = new InvalidStatusError()
      const result = sut(error)
      expect(result).toEqual(badRequest(error))
    })

    test('Should return badRequest on MissingParamError', async () => {
      const error = new MissingParamError('any_param')
      const result = sut(error)
      expect(result).toEqual(badRequest(error))
    })

    test('Should return badRequest on SoapError', async () => {
      const error = new SoapError('any_message')
      const result = sut(error)
      expect(result).toEqual(badRequest(error))
    })
  })
})
