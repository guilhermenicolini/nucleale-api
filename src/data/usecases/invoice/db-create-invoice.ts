import { CreateInvoice } from '@/domain/usecases'
import {
  LoadAccountRepository,
  LoadAddressRepository,
  LoadCompanyRepository,
  LoadProcedureRepository,
  LoadNextRpsRepository
} from '@/data/protocols'
import { RecordNotFoundError } from '@/presentation/errors'

export class DbCreateInvoice implements CreateInvoice {
  constructor (
    private readonly loadAccountRepository: LoadAccountRepository,
    private readonly loadAddressRepository: LoadAddressRepository,
    private readonly loadCompanyRepository: LoadCompanyRepository,
    private readonly loadProcedureRepository: LoadProcedureRepository,
    private readonly loadNextRpsRepository: LoadNextRpsRepository
  ) { }

  async create (params: CreateInvoice.Params): Promise<CreateInvoice.Result> {
    const account = await this.loadAccountRepository.loadById(params.userId)
    if (!account) {
      return new RecordNotFoundError('Account')
    }
    const address = await this.loadAddressRepository.load(account.accountId)
    if (!address) {
      return new RecordNotFoundError('Address')
    }

    const company = await this.loadCompanyRepository.load()
    if (!company) {
      return new RecordNotFoundError('Company')
    }

    const procedure = await this.loadProcedureRepository.load(params.procedureId, company.id)
    if (!procedure) {
      return new RecordNotFoundError('Procedure')
    }

    const rpsNumber = await this.loadNextRpsRepository.load()
    if (!rpsNumber) {
      return new RecordNotFoundError('Rps')
    }

    return null
  }
}
