import { AddressModel } from '@/domain/models'
import { LoadAddressByZip } from '@/domain/usecases'
import { ObjectId } from 'mongodb'

export const mockAddressModel = (accountId?: any): AddressModel => ({
  id: new ObjectId().toString(),
  accountId: accountId || new ObjectId().toString(),
  address: 'any_address',
  number: '87687',
  complement: 'any',
  district: 'any',
  city: 'any_city',
  cityId: 4234,
  state: 'SP',
  country: 'any_country',
  zip: '12345678'
})

export const mockAddAddressModel = (accountId?: string): Omit<AddressModel, 'id'> => ({
  accountId: accountId || new ObjectId().toString(),
  address: 'any_address',
  number: '76876',
  complement: 'any',
  district: 'any',
  city: 'any_city',
  cityId: 1234,
  state: 'SP',
  country: 'any_country',
  zip: '12345678'
})

export const mockRemoteAddressModel = (): LoadAddressByZip.Result => ({
  address: 'any_address',
  district: 'any',
  city: 'any_city',
  state: 'SP'
})
