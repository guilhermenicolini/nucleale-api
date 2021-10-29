import {
  unauthorized,
  badRequest,
  serverError,
  forbidden,
  notFound
} from '@/presentation/helpers'
import {
  AccessDeniedError,
  ClientError,
  EmailInUseError,
  InsufficientPermissionError,
  InvalidCredentialsError,
  InvalidParamError,
  InvalidStatusError,
  MissingParamError,
  RecordNotFoundError,
  SoapError
} from '@/presentation/errors'
import { HttpResponse } from '@/presentation/protocols'

export const handleError = (error: Error): HttpResponse => {
  switch (error.constructor) {
    case AccessDeniedError:
    case InvalidCredentialsError: return unauthorized(error)
    case InsufficientPermissionError: return forbidden(error)
    case RecordNotFoundError: return notFound(error)
    case ClientError:
    case EmailInUseError:
    case InvalidParamError:
    case InvalidStatusError:
    case MissingParamError:
    case SoapError: return badRequest(error)
    default: return serverError(error)
  }
}
