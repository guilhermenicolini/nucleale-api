import { IoGenerateInvoice } from '@/data/usecases'
import { ConverterSpy, TransformerSpy } from '@/tests/data/mocks'
import { mockInvoiceDb, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: IoGenerateInvoice,
  converterSpy: ConverterSpy,
  transformerSpy: TransformerSpy
}

const makeSut = (): SutTypes => {
  const converterSpy = new ConverterSpy()
  const transformerSpy = new TransformerSpy()
  const sut = new IoGenerateInvoice(converterSpy, transformerSpy)
  return {
    sut,
    converterSpy,
    transformerSpy
  }
}

describe('IoGenerateInvoice Usecase', () => {
  test('Should call Converter with correct values', async () => {
    const { sut, converterSpy } = makeSut()
    const model = mockInvoiceDb()
    await sut.generate(model)
    expect(converterSpy.data).toEqual(model)
  })

  test('Should throw if Converter throws', async () => {
    const { sut, converterSpy } = makeSut()
    jest.spyOn(converterSpy, 'convert').mockImplementationOnce(throwError)
    const promise = sut.generate(mockInvoiceDb())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Transformer with correct values', async () => {
    const { sut, converterSpy, transformerSpy } = makeSut()
    await sut.generate(mockInvoiceDb())
    expect(transformerSpy.data).toEqual(converterSpy.result)
  })

  test('Should throw if Transformer throws', async () => {
    const { sut, transformerSpy } = makeSut()
    jest.spyOn(transformerSpy, 'transform').mockImplementationOnce(throwError)
    const promise = sut.generate(mockInvoiceDb())
    await expect(promise).rejects.toThrow()
  })

  test('Should return object on success', async () => {
    const { sut } = makeSut()
    const data = mockInvoiceDb()
    const result = await sut.generate(data)
    expect(result.fileName).toBe(`nf${data.invoiceNo}.pdf`)
    expect(result.pdf).toBeTruthy()
  })
})
