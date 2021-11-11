import {
  LoadProcedures
} from '@/domain/usecases'
import { mockProcedureWithService } from '@/tests/domain/mocks'

export class LoadProceduresSpy implements LoadProcedures {
  calls: number = 0
  result: LoadProcedures.Result = [mockProcedureWithService(), mockProcedureWithService()]

  async loadAll (): Promise<LoadProcedures.Result> {
    this.calls++
    return this.result
  }
}
