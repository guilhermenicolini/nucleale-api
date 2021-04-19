import {
  makeDeleteChildrenValidation,
  makeDbDeleteChildren
} from '@/main/factories'
import { DeleteChildrenController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeDeleteChildrenController = (): Controller => {
  return new DeleteChildrenController(
    makeDeleteChildrenValidation(),
    makeDbDeleteChildren())
}
