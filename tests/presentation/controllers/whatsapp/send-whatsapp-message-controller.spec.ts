import { SendWhatsappMessageController } from '@/presentation/controllers'
import {
  ValidationSpy,
  SendMessageSpy
} from '@/tests/presentation/mocks'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { ServerError } from '@/presentation/errors'

const mockMessage = (): SendWhatsappMessageController.Request => ({
  mobilePhone: '+5519998765432',
  message: 'any words'
})

type SutTypes = {
  sut: SendWhatsappMessageController,
  validationSpy: ValidationSpy,
  sendMessageSpy: SendMessageSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sendMessageSpy = new SendMessageSpy()
  const sut = new SendWhatsappMessageController(
    validationSpy,
    sendMessageSpy)
  return {
    sut,
    validationSpy,
    sendMessageSpy
  }
}

describe('SendWhatsappMessage Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockMessage()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockMessage())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call SendMessage with correct values', async () => {
    const { sut, sendMessageSpy } = makeSut()
    const request = mockMessage()
    await sut.handle(request)
    expect(sendMessageSpy.message).toEqual({
      phone: request.mobilePhone,
      text: request.message
    })
  })

  test('Should return 500 if SendMessage throws', async () => {
    const { sut, sendMessageSpy } = makeSut()
    jest.spyOn(sendMessageSpy, 'send').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockMessage())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockMessage())
    expect(httpResponse).toEqual(noContent())
  })
})
