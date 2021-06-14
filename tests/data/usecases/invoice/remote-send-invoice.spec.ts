import { RemoteSendInvoice } from '@/data/usecases'
import env from '@/main/config/env'
import { SoapError } from '@/presentation/errors'
import {
  InvoiceToRpsConverterSpy,
  RpsEncoderSpy,
  SignerSpy,
  SoapClientSpy,
  RpsDecoderSpy
} from '@/tests/data/mocks'
import { mockInvoice, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: RemoteSendInvoice
  invoiceToRpsConverterSpy: InvoiceToRpsConverterSpy
  rpsEncoderSpy: RpsEncoderSpy
  signerSpy: SignerSpy
  soapClientSpy: SoapClientSpy
  decoderSpy: RpsDecoderSpy
}

const makeSut = (): SutTypes => {
  const invoiceToRpsConverterSpy = new InvoiceToRpsConverterSpy()
  const rpsEncoderSpy = new RpsEncoderSpy()
  const signerSpy = new SignerSpy()
  const soapClientSpy = new SoapClientSpy()
  const decoderSpy = new RpsDecoderSpy()
  const sut = new RemoteSendInvoice(
    invoiceToRpsConverterSpy,
    rpsEncoderSpy,
    signerSpy,
    soapClientSpy,
    decoderSpy
  )

  return {
    sut,
    invoiceToRpsConverterSpy,
    rpsEncoderSpy,
    signerSpy,
    soapClientSpy,
    decoderSpy
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

  test('Should call SoapClient with correct values', async () => {
    const { sut, signerSpy, soapClientSpy } = makeSut()
    await sut.send(mockInvoice())
    expect(soapClientSpy.request).toEqual({
      url: env.nfse.url,
      method: env.nfse.methods.lote,
      message: {
        mensagemXml: signerSpy.result
      }
    })
  })

  test('Should return error if SoapClient returns false', async () => {
    const { sut, soapClientSpy } = makeSut()
    soapClientSpy.result = {
      success: false,
      error: new Error()
    }
    const result = await sut.send(mockInvoice())
    expect(result).toEqual(new Error())
  })

  test('Should return error if SoapClient throws', async () => {
    const { sut, soapClientSpy } = makeSut()
    jest.spyOn(soapClientSpy, 'send').mockImplementationOnce(throwError)
    const result = await sut.send(mockInvoice())
    expect(result).toEqual(new Error())
  })

  test('Should call Decoder with correct values', async () => {
    const { sut, soapClientSpy, decoderSpy } = makeSut()
    await sut.send(mockInvoice())
    expect(decoderSpy.data).toEqual(soapClientSpy.result.response)
  })

  test('Should return error if Decoder throws', async () => {
    const { sut, decoderSpy } = makeSut()
    jest.spyOn(decoderSpy, 'decode').mockImplementationOnce(throwError)
    const result = await sut.send(mockInvoice())
    expect(result).toEqual(new Error())
  })

  test('Should return error if Decoder returns error', async () => {
    const { sut, decoderSpy } = makeSut()
    decoderSpy.result = {
      'ns1:RetornoEnvioLoteRPS': {
        Erros: {
          Erro: {
            Codigo: 1,
            Descricao: 'Teste'
          }
        }
      }
    }
    const result = await sut.send(mockInvoice())
    expect(result).toEqual(new SoapError('1 Teste'))
  })
})
