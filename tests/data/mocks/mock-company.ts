import {
  LoadCompanyRepository,
  LoadProcedureRepository
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
  companyId: string
  result: LoadProcedureRepository.Result = mockProcedureWithService()

  async load (procedureId: string, companyId: string): Promise<LoadProcedureRepository.Result> {
    this.procedureId = procedureId
    this.companyId = companyId
    return this.result
  }
}
