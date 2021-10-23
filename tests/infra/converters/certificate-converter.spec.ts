import { CertificateConverter } from '@/infra/converters'
import { TimeManipulatorSpy } from '@/tests/data/mocks'

import faker from 'faker'
import fs from 'fs'

const mockData = (): CertificateConverter.Model => ({
  id: faker.datatype.uuid(),
  accountId: faker.datatype.uuid(),
  course: faker.random.words(4),
  date: faker.date.past().valueOf(),
  hours: faker.datatype.number(),
  name: faker.name.findName(),
  type: faker.random.arrayElement(['online', 'presencial']),
  hash: faker.random.alphaNumeric(8).toLowerCase()
})

type SutTypes = {
  sut: CertificateConverter,
  timeManipulatorSpy: TimeManipulatorSpy
}

const makeSut = (): SutTypes => {
  const timeManipulatorSpy = new TimeManipulatorSpy()
  const sut = new CertificateConverter(
    timeManipulatorSpy
  )
  return {
    sut,
    timeManipulatorSpy
  }
}

describe('Certificate Converter', () => {
  test('Should return certificate on success', async () => {
    const { sut } = makeSut()
    const result = await sut.convert(mockData())
    expect(result).toBeTruthy()

    fs.writeFile(result.name, result.buffer, (err) => {
      if (err) console.log(err)
    })
  })
})
