import { CertificatetMongoRepository, MongoHelper } from '@/infra/db'
import { mockCertificateModel, mockDbCertificateModel } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'

const makeSut = (): CertificatetMongoRepository => {
  return new CertificatetMongoRepository()
}

let certificatesCollection: Collection

describe('CertificatetMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.instance.connect()
  })

  afterAll(async () => {
    await MongoHelper.instance.disconnect()
  })

  beforeEach(async () => {
    certificatesCollection = await MongoHelper.instance.getCollection('certificates')
    await certificatesCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should insert certificate and return id and hash', async () => {
      const sut = makeSut()
      const data = mockCertificateModel()
      const certificate = await sut.add(data)
      const records = await certificatesCollection.find({}).toArray()
      expect(records.length).toBe(1)
      expect(certificate.id).toBeTruthy()
      expect(certificate.hash).toBeTruthy()
    })
  })

  describe('loadByHash()', () => {
    test('Should return null if certificate not exists', async () => {
      const sut = makeSut()
      const certificate = await sut.loadByHash('any_hash')
      const records = await certificatesCollection.find({}).toArray()
      expect(records.length).toBe(0)
      expect(certificate).toBeFalsy()
    })

    test('Should return certificate on success', async () => {
      const data = mockDbCertificateModel()
      await certificatesCollection.insertOne(data)
      const sut = makeSut()
      const certificate = await sut.loadByHash(data.hash)
      const records = await certificatesCollection.find({}).toArray()
      const { _id, accountId, ...rest } = data
      expect(records.length).toBe(1)
      expect(certificate).toEqual({ id: _id.toString(), accountId: accountId.toString(), ...rest })
    })
  })
})
