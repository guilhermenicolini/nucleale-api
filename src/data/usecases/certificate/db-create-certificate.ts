import { CreateCertificate } from '@/domain/usecases'
import {
  LoadAccountRepository,
  LoadProcedureRepository,
  AddCertificateRepository
} from '@/data/protocols'
import { RecordNotFoundError } from '@/presentation/errors'

export class DbCreateCertificate implements CreateCertificate {
  constructor (
    private readonly loadAccountRepository: LoadAccountRepository,
    private readonly loadProcedureRepository: LoadProcedureRepository,
    private readonly addCertificateRepository: AddCertificateRepository
  ) { }

  async create (params: CreateCertificate.Params): Promise<CreateCertificate.Result> {
    const account = await this.loadAccountRepository.loadById(params.userId)
    if (!account) {
      throw new RecordNotFoundError('Conta não encontrada')
    }

    const procedure = await this.loadProcedureRepository.loadProcedure(params.procedureId)
    if (!procedure) {
      throw new RecordNotFoundError('Procedimento não encontrado')
    }

    const certificate = await this.addCertificateRepository.add({
      accountId: account.accountId,
      type: params.type,
      course: procedure.name,
      date: params.date,
      name: account.name,
      hours: procedure.hours
    })

    return certificate
  }
}
