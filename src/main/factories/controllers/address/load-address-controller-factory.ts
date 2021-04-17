import {
  makeDbLoadAddress
} from '@/main/factories'
import { LoadAddressController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadAddressController = (): Controller => {
  return new LoadAddressController(makeDbLoadAddress())
}
