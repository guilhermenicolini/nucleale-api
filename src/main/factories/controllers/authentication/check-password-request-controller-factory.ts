import {
  makeCheckPasswordRequestValidation,
  makeDbCheckAccountLink
} from '@/main/factories'
import { CheckPasswordRequestController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeCheckPasswordRequestController = (): Controller => {
  return new CheckPasswordRequestController(
    makeCheckPasswordRequestValidation(),
    makeDbCheckAccountLink()
  )
}
