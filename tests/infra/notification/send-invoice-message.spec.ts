import { SendInvoiceMessage } from '@/infra/notification'
import { mockPerson, mockXmlFileBuffer } from '@/tests/domain/mocks'

const makeSut = (): SendInvoiceMessage => new SendInvoiceMessage()

describe('SendInvoiceMessage', () => {
  test('Should create message on success', async () => {
    const sut = makeSut()
    const model: SendInvoiceMessage.Model = {
      to: mockPerson(),
      invoiceNo: 123,
      pdf: mockXmlFileBuffer()
    }
    const message = await sut.create(model)
    expect(message).toEqual({
      subject: `Nota Fiscal #${model.invoiceNo}`,
      email: model.to.email,
      phone: model.to.phone,
      text: `Olá, ${model.to.name}. Sua nota fiscal foi gerada e já estamos te encaminhado.`,
      file: {
        name: `nf${model.invoiceNo}.pdf`,
        base64: model.pdf.toString('base64'),
        mimeType: 'application/pdf'
      }
    })
  })
})
