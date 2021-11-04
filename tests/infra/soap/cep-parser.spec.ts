import { CepParser } from '@/infra/soap'

import faker from 'faker'

const mockRequest = (): any => faker.random.objectElement()

const makeSut = (): CepParser => new CepParser()

describe('CepParser', () => {
  test('Should return null on invalid data', async () => {
    const sut = makeSut()
    const request = null
    const result = await sut.parse(request)
    expect(result).toBeFalsy()
  })

  test('Should return message on success', async () => {
    const sut = makeSut()
    const request = mockRequest()
    const result = await sut.parse(request)
    expect(result).toBe(request)
  })
})
