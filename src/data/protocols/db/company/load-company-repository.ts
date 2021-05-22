import { CompanyModel } from '@/domain/models'

export interface LoadCompanyRepository {
  load: () => Promise<LoadCompanyRepository.Result>
}

export namespace LoadCompanyRepository {
  export type Result = CompanyModel
}
