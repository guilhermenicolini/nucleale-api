import { IoLoadInvoices } from '@/data/usecases'
import { NfseDecrypterSpy, TransformerSpy } from '@/tests/data/mocks'
import { mockXmlFileBuffer, throwError } from '@/tests/domain/mocks'

const mockBuffer = (): Buffer => {
  return mockXmlFileBuffer().buffer
}

type SutTypes = {
  sut: IoLoadInvoices,
  decrypterSpy: NfseDecrypterSpy,
  transformerSpy: TransformerSpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new NfseDecrypterSpy()
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
    expect(decrypterSpy.buffer).toEqual(buffer)
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const promise = sut.load(mockBuffer())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Transformer with correct values', async () => {
    const { sut, decrypterSpy, transformerSpy } = makeSut()
    const spy = jest.spyOn(transformerSpy, 'transform')
    await sut.load(mockBuffer())
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenNthCalledWith(1, decrypterSpy.result.NOTAS_FISCAIS.NOTA_FISCAL[0])
    expect(spy).toHaveBeenNthCalledWith(2, decrypterSpy.result.NOTAS_FISCAIS.NOTA_FISCAL[1])
  })

  test('Should throw if Transformer throws', async () => {
    const { sut, transformerSpy } = makeSut()
    jest.spyOn(transformerSpy, 'transform').mockImplementationOnce(throwError)
    const promise = sut.load(mockBuffer())
    await expect(promise).rejects.toThrow()
  })

  test('Should return object on success', async () => {
    const { sut, transformerSpy } = makeSut()
    const result = await sut.load(mockBuffer())
    const field = Object.keys(transformerSpy.result)[0]
    expect(result).toEqual([
      { [field]: transformerSpy.result[field] },
      { [field]: transformerSpy.result[field] }
    ])
  })
})
