import { CertificateModel, CertificateType, FileModel } from '@/domain/models'
import { CreateCertificate } from '@/domain/usecases'
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

export const mockDbCertificateModel = (): CreateCertificate.Params => ({
  userId: new ObjectId().toString(),
  procedureId: new ObjectId().toString(),
  type: faker.random.arrayElement(Object.values(CertificateType)),
  date: faker.date.soon().valueOf()
})

export const mockFileModel = (): FileModel => ({
  name: faker.system.fileName(),
  mimeType: faker.system.mimeType(),
  base64: Buffer.from(faker.random.words()).toString('base64')
})
