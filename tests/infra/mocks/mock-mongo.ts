import { MongoHelper } from '@/infra/db'
import { mockAccountModel, mockAddressModel, mockCompanyModel, mockDbServiceWithProcedure } from '@/tests/domain/mocks'
import { ObjectId } from 'mongodb'
import faker from 'faker'

const change = (data: any): any => {
  const obj = JSON.parse(JSON.stringify(data))
  delete obj.id
  obj._id = new ObjectId()
  if (obj.accountId) {
    obj.accountId = new ObjectId(obj.accountId)
  }
  return obj
}

export const createInvoiceDatabase = async () => {
  const accountCollection = await MongoHelper.instance.getCollection('accounts')
  const companiesCollection = await MongoHelper.instance.getCollection('companies')
  const addressesCollection = await MongoHelper.instance.getCollection('addresses')
  const account = change(mockAccountModel())
  const company = change(mockCompanyModel())
  company.services = [mockDbServiceWithProcedure()]
  const address = change(mockAddressModel(account.accountId))
  await accountCollection.insertOne(account)
  await companiesCollection.insertOne(company)
  await addressesCollection.insertOne(address)

  return {
    user: account._id.toString(),
    procedure: company.services[0].procedures[0]._id.toString(),
    amount: faker.datatype.number({ min: 100, max: 999 })
  }
}
