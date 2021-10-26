import { IoGenerateCertificate } from '@/data/usecases'
import { ObjectConverterSpy } from '@/tests/data/mocks'
import { mockCertificateModel, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: IoGenerateCertificate,
  objectConverterSpy: ObjectConverterSpy
}

const makeSut = (): SutTypes => {
  const objectConverterSpy = new ObjectConverterSpy()
  const sut = new IoGenerateCertificate(objectConverterSpy)
  return {
    sut,
    objectConverterSpy
  }
}

describe('IoGenerateCertificateUsecase', () => {
  test('Should call ObjectConverter with correct values', async () => {
    const { sut, objectConverterSpy } = makeSut()
    const model = mockCertificateModel()
    await sut.generate(model)
    expect(objectConverterSpy.data).toEqual(model)
  })

  test('Should throw if ObjectConverter throws', async () => {
    const { sut, objectConverterSpy } = makeSut()
    jest.spyOn(objectConverterSpy, 'convert').mockImplementationOnce(throwError)
    const promise = sut.generate(mockCertificateModel())
    await expect(promise).rejects.toThrow()
  })

  test('Should return object on success', async () => {
    const { sut, objectConverterSpy } = makeSut()
    const data = mockCertificateModel()
    const result = await sut.generate(data)
    expect(result).toEqual(objectConverterSpy.result)
  })
})
