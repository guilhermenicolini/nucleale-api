import { LinkModel, LinkTypes } from '@/domain/models'

import faker from 'faker'

export const mockLinkModel = (): LinkModel => {
  return {
    id: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
    type: faker.random.arrayElement(Object.values(LinkTypes)),
    expiration: faker.date.future().valueOf()
  }
}
