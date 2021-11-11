import {
  LoadCompanyRepository,
  LoadProcedureRepository,
  LoadProceduresRepository
} from '@/data/protocols'
import { mockCompanyModel, mockProcedureWithService } from '@/tests/domain/mocks'

export class LoadCompanyRepositorySpy implements LoadCompanyRepository {
    result: LoadCompanyRepository.Result = mockCompanyModel()

    async load (): Promise<LoadCompanyRepository.Result> {
      return this.result
    }
}

export class LoadProcedureRepositorySpy implements LoadProcedureRepository {
  procedureId: string
  result: LoadProcedureRepository.Result = mockProcedureWithService()

  async loadProcedure (procedureId: string): Promise<LoadProcedureRepository.Result> {
    this.procedureId = procedureId
    return this.result
  }
}

export class LoadProceduresRepositorySpy implements LoadProceduresRepository {
  calls: number = 0
  result: LoadProceduresRepository.Result = [mockProcedureWithService(), mockProcedureWithService()]

  async loadProcedures (): Promise<LoadProceduresRepository.Result> {
    this.calls++
    return this.result
  }
}
