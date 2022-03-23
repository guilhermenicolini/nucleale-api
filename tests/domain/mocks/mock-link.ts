import { LinkModel, LinkTypes } from '@/domain/models'

export const mockLinkModel = (): LinkModel => {
  return {
    id: 'any_id',
    userId: 'any_id',
    type: LinkTypes.passwordRecovery,
    expiration: 1647982564066
  }
}
