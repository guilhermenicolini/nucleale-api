import { LinkTypes } from './enums'
export type LinkModel = {
  id: string
  userId: string
  type: LinkTypes
  expiration: number
}
