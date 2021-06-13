import { RemoteSendInvoice } from '@/data/usecases'
import {
  InvoiceToRpsConverterSpy,
  RpsEncoderSpy,
  SignerSpy
} from '@/tests/data/mocks'
import { mockInvoice, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: RemoteSendInvoice,
  invoiceToRpsConverterSpy: InvoiceToRpsConverterSpy,
  rpsEncoderSpy: RpsEncoderSpy,
  signerSpy: SignerSpy
}

const makeSut = (): SutTypes => {
  const invoiceToRpsConverterSpy = new InvoiceToRpsConverterSpy()
  const rpsEncoderSpy = new RpsEncoderSpy()
  const signerSpy = new SignerSpy()
  const sut = new RemoteSendInvoice(
    invoiceToRpsConverterSpy,
    rpsEncoderSpy,
    signerSpy
  )

  return {
    sut,
    invoiceToRpsConverterSpy,
    rpsEncoderSpy,
    signerSpy
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

  test('Should return error if Encoder throws', async () => {
    const { sut, rpsEncoderSpy } = makeSut()
    jest.spyOn(rpsEncoderSpy, 'encode').mockImplementationOnce(throwError)
    const result = await sut.send(mockInvoice())
    expect(result).toEqual(new Error())
  })

  test('Should call Signer with correct values', async () => {
    const { sut, rpsEncoderSpy, signerSpy } = makeSut()
    await sut.send(mockInvoice())
    expect(signerSpy.data).toEqual(rpsEncoderSpy.result)
  })

  test('Should return error if Signer throws', async () => {
    const { sut, signerSpy } = makeSut()
    jest.spyOn(signerSpy, 'sign').mockImplementationOnce(throwError)
    const result = await sut.send(mockInvoice())
    expect(result).toEqual(new Error())
  })
})
