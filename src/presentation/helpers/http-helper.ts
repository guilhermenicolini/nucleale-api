import { HttpResponse } from '@/presentation/protocols'
import { ServerError } from '@/presentation/errors'

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: error
})
