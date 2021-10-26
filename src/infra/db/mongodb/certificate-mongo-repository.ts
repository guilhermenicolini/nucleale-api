import { MongoHelper } from '@/infra/db'
import {
  AddCertificateRepository
} from '@/data/protocols'
import { ObjectId } from 'mongodb'

export class CertificatetMongoRepository implements
AddCertificateRepository {
  async add (data: AddCertificateRepository.Params): Promise<AddCertificateRepository.Result> {
    const certificatesCollection = await MongoHelper.instance.getCollection('certificates')

    const { accountId, ...obj } = data
    const accId = new ObjectId(accountId)
    const cmd = await certificatesCollection.insertOne({ accountId: accId, ...obj })
    return {
      id: cmd.insertedId.toString(),
      hash: Math.random().toString(36).slice(2).substring(0, 8),
      ...data
    }
  }
}
