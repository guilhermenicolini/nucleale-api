import { CertificateModel, CertificateType, FileModel } from '@/domain/models'
import { CreateCertificate, LoadCertificates } from '@/domain/usecases'
import { CreateCertificateController, DownloadCertificateController } from '@/presentation/controllers'
import { ObjectId } from 'mongodb'

export const mockCertificateModel = (): CertificateModel => ({
  id: new ObjectId().toString(),
  accountId: new ObjectId().toString(),
  course: 'any words',
  date: 1647982564066,
  hash: 'abcd1234',
  hours: 123,
  name: 'any_name',
  type: CertificateType.online
})

export const mockDbCertificateModel = () => ({
  _id: new ObjectId(),
  accountId: new ObjectId(),
  course: 'any words',
  date: 1647982564066,
  hash: 'abcd1234',
  hours: 123,
  name: 'any_name',
  type: CertificateType.online
})

export const mockDbCreateCertificateModel = (): CreateCertificate.Params => ({
  userId: new ObjectId().toString(),
  procedureId: new ObjectId().toString(),
  type: CertificateType.online,
  date: 1647982564066
})

export const mockCreateCertificateRequest = (): CreateCertificateController.Request => ({
  user: new ObjectId().toString(),
  procedure: new ObjectId().toString(),
  type: CertificateType.online,
  date: 1647982564066
})

export const mockFileModel = (): FileModel => ({
  name: 'filename',
  mimeType: 'application/pdf',
  base64: Buffer.from('any words').toString('base64')
})

export const mockDownloadCertificateRequest = (): DownloadCertificateController.Request => ({
  accountId: new ObjectId().toString(),
  hash: 'abcd1234'
})

export const mockLoadCertificate = (): LoadCertificates.ResultModel => ({
  course: 'any words',
  date: 1647982564066,
  hash: 'abcd1234',
  hours: 123,
  name: 'any_name',
  type: CertificateType.online
})
