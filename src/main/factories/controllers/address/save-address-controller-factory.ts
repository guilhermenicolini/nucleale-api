import {
  makeSaveAddressValidation,
  makeDbSaveAddress
} from '@/main/factories'
import { SaveAddressController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSaveAddressController = (): Controller => {
  return new SaveAddressController(
    makeSaveAddressValidation(),
    makeDbSaveAddress())
}
