import { accountMapper, MongoHelper } from '@/infra/db'
import {
  AddCertificateRepository,
  LoadCertificateByHashRepository,
  LoadCertificatesRepository
} from '@/data/protocols'
import { ObjectId } from 'mongodb'

export class CertificatetMongoRepository implements
AddCertificateRepository,
LoadCertificateByHashRepository,
LoadCertificatesRepository {
  async add (data: AddCertificateRepository.Params): Promise<AddCertificateRepository.Result> {
    const certificatesCollection = await MongoHelper.instance.getCollection('certificates')

    const hash = Math.random().toString(36).slice(2).substring(0, 8)

    const { accountId, ...obj } = data
    const accId = new ObjectId(accountId)
    const cmd = await certificatesCollection.insertOne({ accountId: accId, hash, ...obj })
    return {
      id: cmd.insertedId.toString(),
      hash,
      ...data
    }
  }

  async loadByHash (hash: string): Promise<LoadCertificateByHashRepository.Result> {
    const certificatesCollection = await MongoHelper.instance.getCollection('certificates')
    const certificate = await certificatesCollection.findOne<LoadCertificateByHashRepository.Result>({ hash })
    return certificate ? MongoHelper.instance.map(certificate, accountMapper()) : null
  }

  async load (accountId: string): Promise<LoadCertificatesRepository.Result> {
    const certificatesCollection = await MongoHelper.instance.getCollection('certificates')
    const certificates = await certificatesCollection
      .find({
        accountId: new ObjectId(accountId)
      }, {
        projection: {
          accountId: 0
        }
      }).sort({ date: -1 }).toArray()
    return MongoHelper.instance.mapCollection(certificates)
  }
}
