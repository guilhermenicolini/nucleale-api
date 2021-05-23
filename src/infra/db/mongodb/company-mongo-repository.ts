import { MongoHelper } from '@/infra/db'
import {
  LoadCompanyRepository
} from '@/data/protocols'

export class CompanyMongoRepository implements
LoadCompanyRepository {
  async load (): Promise<LoadCompanyRepository.Result> {
    const companiesCollection = await MongoHelper.instance.getCollection('companies')
    const company = await companiesCollection.findOne({}, {
      projection: {
        services: 0
      }
    })
    return company ? MongoHelper.instance.map(company) : null
  }
}
