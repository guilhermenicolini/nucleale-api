import { CertificateModel, CertificateType, FileModel } from '@/domain/models'
import { CreateCertificate } from '@/domain/usecases'
import { CreateCertificateController, DownloadCertificateController } from '@/presentation/controllers'
import faker from 'faker'
import { ObjectId } from 'mongodb'

export const mockCertificateModel = (): CertificateModel => ({
  id: new ObjectId().toString(),
  accountId: new ObjectId().toString(),
  course: faker.random.words(3),
  date: faker.date.soon().valueOf(),
  hash: faker.random.alphaNumeric(8).toLowerCase(),
  hours: faker.datatype.number(),
  name: faker.name.findName(),
  type: faker.random.arrayElement(Object.values(CertificateType))
})

export const mockDbCertificateModel = () => ({
  _id: new ObjectId(),
  accountId: new ObjectId(),
  course: faker.random.words(3),
  date: faker.date.soon().valueOf(),
  hash: faker.random.alphaNumeric(8).toLowerCase(),
  hours: faker.datatype.number(),
  name: faker.name.findName(),
  type: faker.random.arrayElement(Object.values(CertificateType))
})

export const mockDbCreateCertificateModel = (): CreateCertificate.Params => ({
  userId: new ObjectId().toString(),
  procedureId: new ObjectId().toString(),
  type: faker.random.arrayElement(Object.values(CertificateType)),
  date: faker.date.soon().valueOf()
})

export const mockCreateCertificateRequest = (): CreateCertificateController.Request => ({
  user: new ObjectId().toString(),
  procedure: new ObjectId().toString(),
  type: faker.random.arrayElement(Object.values(CertificateType)),
  date: faker.date.soon().valueOf()
})

export const mockFileModel = (): FileModel => ({
  name: faker.system.fileName(),
  mimeType: faker.system.mimeType(),
  base64: Buffer.from(faker.random.words()).toString('base64')
})

export const mockDownloadCertificateRequest = (): DownloadCertificateController.Request => ({
  accountId: new ObjectId().toString(),
  hash: faker.random.alphaNumeric(8).toLowerCase()
})
