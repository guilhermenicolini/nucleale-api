import { CertificateType } from '@/domain/models'
import { CertificateConverter } from '@/infra/converters'
import { TimeManipulatorSpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

const mockData = (): CertificateConverter.Model => ({
  id: 'any_id',
  accountId: 'any_id',
  course: 'any words',
  date: 315543600000,
  hours: 123,
  name: 'any_name',
  type: CertificateType.online,
  hash: 'abcd1234'
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
  })

  test('Should throw if convert method fails', async () => {
    const { sut, timeManipulatorSpy } = makeSut()
    jest.spyOn(timeManipulatorSpy, 'toDateObj').mockImplementationOnce(throwError)
    const promise = sut.convert(mockData())
    expect(promise).rejects.toThrow()
  })
})
