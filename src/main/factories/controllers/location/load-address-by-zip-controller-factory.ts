import { LoadAddressByZipController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import {
  makeLoadAddressByZipValidation,
  makeRemoteLoadAddressByZip
} from '@/main/factories'

export const makeLoadAddressByZipController = (): Controller => {
  return new LoadAddressByZipController(
    makeLoadAddressByZipValidation(),
    makeRemoteLoadAddressByZip()
  )
}
