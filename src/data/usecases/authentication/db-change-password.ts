import { ChangePassword } from '@/domain/usecases'
import { Hasher, LoadLinkRepository, SaveAccountRepository } from '@/data/protocols'
import { LinkTypes } from '@/domain/models'
import { ClientError, RecordNotFoundError } from '@/presentation/errors'

export class DbChangePassword implements ChangePassword {
  constructor (
    private readonly hasher: Hasher<string, string>,
    private readonly loadLinkRepository: LoadLinkRepository,
    private readonly saveAccountRepository: SaveAccountRepository
  ) { }

  async change (params: ChangePassword.Params): Promise<ChangePassword.Result> {
    const link = await this.loadLinkRepository.load({
      token: params.token,
      type: LinkTypes.passwordRecovery
    })

    if (!link) return new RecordNotFoundError('Token não encontrado')
    if ((link.expiration || 0) < new Date().valueOf()) return new ClientError('Token expirado')

    const hashedPassword = await this.hasher.hash(params.password)

    const data = {
      password: hashedPassword
    }

    await this.saveAccountRepository.save(link.userId, data)
  }
}
