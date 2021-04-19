import {
  makeUpdateChildrenValidation,
  makeDbUpdateChildren
} from '@/main/factories'
import { UpdateChildrenController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateChildrenController = (): Controller => {
  return new UpdateChildrenController(
    makeUpdateChildrenValidation(),
    makeDbUpdateChildren())
}
