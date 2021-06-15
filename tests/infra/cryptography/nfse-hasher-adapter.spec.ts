import { NfseHasherAdapter } from '@/infra/cryptography'
import { TimeManipulatorSpy } from '@/tests/data/mocks'
import { mockInvoiceDb } from '@/tests/domain/mocks'

import Crypto from 'crypto'

const digestStub = jest.fn().mockImplementation(() => 'any_sha1')

jest.mock('crypto', () => ({
  createHash: jest.fn().mockImplementation(() => ({
    update: jest.fn().mockImplementation(() => ({
      digest: digestStub
    }))
  }))
}))

const makeSut = (): NfseHasherAdapter => new NfseHasherAdapter(new TimeManipulatorSpy())

describe('NfseHasher Adapter', () => {
  describe('createHash()', () => {
    test('Should call createHash with correct values', async () => {
      const sut = makeSut()
      const spy = jest.spyOn(Crypto, 'createHash')
      await sut.hash(mockInvoiceDb())
      expect(spy).toHaveBeenCalledWith('sha1')
    })

    test('Should call digest with correct values', async () => {
      const sut = makeSut()
      await sut.hash(mockInvoiceDb())
      expect(digestStub).toHaveBeenCalledWith('hex')
    })
  })

  describe('signature()', () => {
    test('Should return signature on success', async () => {
      const sut = makeSut()
      const sha1 = await sut.hash(mockInvoiceDb())
      expect(sha1).toEqual('any_sha1')
    })

    test('Should return signature alternative on success', async () => {
      const sut = makeSut()
      const invoice = mockInvoiceDb()
      invoice.pickupType = 'B'
      const sha1 = await sut.hash(invoice)
      expect(sha1).toEqual('any_sha1')
    })
  })
})
