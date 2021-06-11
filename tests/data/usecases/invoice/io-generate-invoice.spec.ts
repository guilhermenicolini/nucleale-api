import { IoGenerateInvoice } from '@/data/usecases'
import { ObjectConverterSpy, PdfTransformerSpy } from '@/tests/data/mocks'
import { mockInvoiceDb, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: IoGenerateInvoice,
  objectConverterSpy: ObjectConverterSpy,
  transformerSpy: PdfTransformerSpy
}

const makeSut = (): SutTypes => {
  const objectConverterSpy = new ObjectConverterSpy()
  const transformerSpy = new PdfTransformerSpy()
  const sut = new IoGenerateInvoice(objectConverterSpy, transformerSpy)
  return {
    sut,
    objectConverterSpy,
    transformerSpy
  }
}

describe('IoGenerateInvoice Usecase', () => {
  test('Should call ObjectConverter with correct values', async () => {
    const { sut, objectConverterSpy } = makeSut()
    const model = mockInvoiceDb()
    await sut.generate(model)
    expect(objectConverterSpy.data).toEqual(model)
  })

  test('Should throw if ObjectConverter throws', async () => {
    const { sut, objectConverterSpy } = makeSut()
    jest.spyOn(objectConverterSpy, 'convert').mockImplementationOnce(throwError)
    const promise = sut.generate(mockInvoiceDb())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Transformer with correct values', async () => {
    const { sut, objectConverterSpy, transformerSpy } = makeSut()
    await sut.generate(mockInvoiceDb())
    expect(transformerSpy.data).toEqual(objectConverterSpy.result)
  })

  test('Should throw if Transformer throws', async () => {
    const { sut, transformerSpy } = makeSut()
    jest.spyOn(transformerSpy, 'transform').mockImplementationOnce(throwError)
    const promise = sut.generate(mockInvoiceDb())
    await expect(promise).rejects.toThrow()
  })

  test('Should reject if toBuffer fails', async () => {
    const { sut, transformerSpy } = makeSut()
    transformerSpy.result = {
      toBuffer: (cb) => cb(new Error(), null)
    }
    const promise = sut.generate(mockInvoiceDb())
    await expect(promise).rejects.toThrow()
  })

  test('Should return object on success', async () => {
    const { sut } = makeSut()
    const data = mockInvoiceDb()
    const result = await sut.generate(data)
    expect(result.fileName).toBe(`nf${data.invoiceNo}.pdf`)
    expect(result.buffer).toBeTruthy()
  })
})
