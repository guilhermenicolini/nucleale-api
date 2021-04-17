import {
  makeAddChildrenValidation,
  makeDbAddChildren
} from '@/main/factories'
import { AddChildrenController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAddChildrenController = (): Controller => {
  return new AddChildrenController(
    makeAddChildrenValidation(),
    makeDbAddChildren())
}
