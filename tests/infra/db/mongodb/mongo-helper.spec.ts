import { MongoHelper as sut } from '@/infra/db'
import { MapperSpy } from '@/tests/infra/mocks'

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

  test('Should call Mapper with correct value', async () => {
    const mapperSpy = new MapperSpy()
    const accounts = [{
      id: 'any_id'
    }]
    const spy = jest.spyOn(mapperSpy, 'map')
    sut.instance.mapCollection(accounts, mapperSpy)
    expect(spy).toHaveBeenCalledWith(accounts[0])
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
