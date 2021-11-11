import {
  makeDbLoadProcedures
} from '@/main/factories'
import { LoadProceduresController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadProceduresController = (): Controller => {
  return new LoadProceduresController(makeDbLoadProcedures())
}
