import { RemoteSendInvoice } from '@/data/usecases'
import {
  InvoiceToRpsConverterSpy,
  RpsEncoderSpy
} from '@/tests/data/mocks'
import { mockInvoice, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: RemoteSendInvoice,
  invoiceToRpsConverterSpy: InvoiceToRpsConverterSpy,
  rpsEncoderSpy: RpsEncoderSpy
}

const makeSut = (): SutTypes => {
  const invoiceToRpsConverterSpy = new InvoiceToRpsConverterSpy()
  const rpsEncoderSpy = new RpsEncoderSpy()
  const sut = new RemoteSendInvoice(
    invoiceToRpsConverterSpy,
    rpsEncoderSpy
  )

  return {
    sut,
    invoiceToRpsConverterSpy,
    rpsEncoderSpy
  }
}

describe('RemoteSendInvoice Usecase', () => {
  test('Should call InvoiceToRpsConvverter with correct values', async () => {
    const { sut, invoiceToRpsConverterSpy } = makeSut()
    const params = mockInvoice()
    await sut.send(params)
    expect(invoiceToRpsConverterSpy.data).toEqual(params)
  })

  test('Should return error if InvoiceToRpsConvverter throws', async () => {
    const { sut, invoiceToRpsConverterSpy } = makeSut()
    jest.spyOn(invoiceToRpsConverterSpy, 'convert').mockImplementationOnce(throwError)
    const result = await sut.send(mockInvoice())
    expect(result).toEqual(new Error())
  })

  test('Should call Encoder with correct values', async () => {
    const { sut, invoiceToRpsConverterSpy, rpsEncoderSpy } = makeSut()
    await sut.send(mockInvoice())
    expect(rpsEncoderSpy.data).toEqual(invoiceToRpsConverterSpy.result)
  })
})
