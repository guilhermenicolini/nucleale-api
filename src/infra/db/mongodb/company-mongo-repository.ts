import { MongoHelper } from '@/infra/db'
import {
  LoadCompanyRepository,
  LoadProcedureRepository
} from '@/data/protocols'
import { ObjectId } from 'bson'

export class CompanyMongoRepository implements
LoadCompanyRepository,
LoadProcedureRepository {
  async load (): Promise<LoadCompanyRepository.Result> {
    const companiesCollection = await MongoHelper.instance.getCollection('companies')
    const company = await companiesCollection.findOne({}, {
      projection: {
        services: 0
      }
    })
    return company ? MongoHelper.instance.map(company) : null
  }

  async loadProcedure (procedureId: string): Promise<LoadProcedureRepository.Result> {
    const companiesCollection = await MongoHelper.instance.getCollection('companies')
    const services = await companiesCollection
      .aggregate([
        {
          $unwind: {
            path: '$services'
          }
        },
        {
          $unwind: {
            path: '$services.procedures'
          }
        },
        {
          $match: {
            'services.procedures._id': new ObjectId(procedureId)
          }
        },
        {
          $replaceRoot: {
            newRoot: '$services'
          }
        }
      ]).toArray()
    if (services?.length !== 1) {
      return null
    }
    return {
      id: services[0].procedures._id.toString(),
      name: services[0].procedures.name,
      description: services[0].procedures.description,
      hours: services[0].procedures.hours,
      service: {
        id: services[0]._id.toString(),
        name: services[0].name,
        activity: services[0].activity,
        aliquote: services[0].aliquote,
        cnae: services[0].cnae,
        operation: services[0].operation,
        pickupType: services[0].pickupType,
        service: services[0].service,
        taxation: services[0].taxation,
        taxable: services[0].taxable,
        procedures: null
      }
    }
  }
}
