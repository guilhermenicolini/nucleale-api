import {
  unauthorized,
  badRequest,
  serverError,
  forbidden,
  notFound
} from '@/presentation/helpers'
import {
  AccessDeniedError,
  InsufficientPermissionError,
  InvalidCredentialsError,
  RecordNotFoundError,
  ServerError
} from '@/presentation/errors'
import { HttpResponse } from '@/presentation/protocols'

export const handleError = (error: Error): HttpResponse => {
  switch (error.constructor) {
    case ServerError: return serverError(error)
    case AccessDeniedError:
    case InvalidCredentialsError: return unauthorized(error)
    case InsufficientPermissionError: return forbidden(error)
    case RecordNotFoundError: return notFound(error)
    default: return badRequest(error)
  }
}
