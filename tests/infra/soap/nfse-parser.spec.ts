import { NfseParser } from '@/infra/soap'
import { SoapError } from '@/presentation/errors'

const mockRequest = (): any => ({
  $value: '<?xml><test>ok</test>'
})

const makeSut = (): NfseParser => new NfseParser()

describe('NfseParser', () => {
  test('Should throw SoapError on invalid result', async () => {
    const sut = makeSut()
    const request = {}
    const promise = sut.parse(request)
    expect(promise).rejects.toThrow(new SoapError('missing $value'))
  })

  test('Should return message on success', async () => {
    const sut = makeSut()
    const request = mockRequest()
    const result = await sut.parse(request)
    expect(result).toBe(request.$value)
  })
})
