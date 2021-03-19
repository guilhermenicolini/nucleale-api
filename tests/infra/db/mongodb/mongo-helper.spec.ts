import { MongoHelper as sut } from '@/infra/db'

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await sut.instance.connect()
  })

  afterAll(async () => {
    await sut.instance.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.instance.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.instance.disconnect()
    accountCollection = await sut.instance.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
