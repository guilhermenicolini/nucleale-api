import { CreateInvoice } from '@/domain/usecases'
import {
  LoadAccountRepository,
  LoadAddressRepository,
  LoadCompanyRepository,
  LoadProcedureRepository,
  LoadNextRpsRepository
} from '@/data/protocols'
import { RecordNotFoundError } from '@/presentation/errors'
import { ObjectConverter } from '@/data/protocols/convertion'

export class DbCreateInvoice implements CreateInvoice {
  constructor (
    private readonly loadAccountRepository: LoadAccountRepository,
    private readonly loadAddressRepository: LoadAddressRepository,
    private readonly loadCompanyRepository: LoadCompanyRepository,
    private readonly loadProcedureRepository: LoadProcedureRepository,
    private readonly loadNextRpsRepository: LoadNextRpsRepository,
    private readonly modelsToInvoiceConverter: ObjectConverter<CreateInvoice.ModelToInvoiceInput, CreateInvoice.Result>
  ) { }

  async create (params: CreateInvoice.Params): Promise<CreateInvoice.Result> {
    const account = await this.loadAccountRepository.loadById(params.userId)
    if (!account) {
      return new RecordNotFoundError('Conta não encontrada')
    }
    const address = await this.loadAddressRepository.load(account.accountId)
    if (!address) {
      return new RecordNotFoundError('Endereço não encontrado')
    }

    const company = await this.loadCompanyRepository.load()
    if (!company) {
      return new RecordNotFoundError('Empresa não encontrada')
    }

    const procedure = await this.loadProcedureRepository.loadProcedure(params.procedureId)
    if (!procedure) {
      return new RecordNotFoundError('Procedimento não encontrado')
    }

    const rpsNumber = await this.loadNextRpsRepository.next()
    if (!rpsNumber) {
      return new RecordNotFoundError('Rps não encontrado')
    }

    return await this.modelsToInvoiceConverter.convert({
      account,
      address,
      company,
      procedure,
      rpsNumber,
      amount: params.amount,
      data: params.data
    })
  }
}
