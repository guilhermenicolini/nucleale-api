import {
  makeDbLoadChildrens
} from '@/main/factories'
import { LoadChildrensController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadChildrensController = (): Controller => {
  return new LoadChildrensController(makeDbLoadChildrens())
}
