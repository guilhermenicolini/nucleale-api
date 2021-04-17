import { Gender } from './enums'
export type ChildrenModel = {
  id: string
  accountId: string
  name: string
  birth: number
  gender: Gender
}
