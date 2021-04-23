import { IoLoadInvoices } from '@/data/usecases'
import { DecrypterSpy, TransformerSpy } from '@/tests/data/mocks'
import { mockXmlFileBuffer, throwError } from '@/tests/domain/mocks'

const mockBuffer = (): Buffer => {
  return mockXmlFileBuffer().buffer
}

type SutTypes = {
  sut: IoLoadInvoices,
  decrypterSpy: DecrypterSpy,
  transformerSpy: TransformerSpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const transformerSpy = new TransformerSpy()
  const sut = new IoLoadInvoices(decrypterSpy, transformerSpy)
  return {
    sut,
    decrypterSpy,
    transformerSpy
  }
}

describe('IoLoadInvoices Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterSpy } = makeSut()
    const buffer = mockBuffer()
    await sut.load(buffer)
    expect(decrypterSpy.ciphertext).toEqual(buffer)
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const promise = sut.load(mockBuffer())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Transformer with correct values', async () => {
    const { sut, decrypterSpy, transformerSpy } = makeSut()
    await sut.load(mockBuffer())
    expect(transformerSpy.data).toEqual(decrypterSpy.result)
  })

  test('Should throw if Transformer throws', async () => {
    const { sut, transformerSpy } = makeSut()
    jest.spyOn(transformerSpy, 'transform').mockImplementationOnce(throwError)
    const promise = sut.load(mockBuffer())
    await expect(promise).rejects.toThrow()
  })
})
