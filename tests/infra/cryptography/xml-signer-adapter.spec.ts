import { XmlSignerAdapter } from '@/infra/cryptography'

const computeSignatureStub = jest.fn().mockReturnThis()
const getSignedXmlStub = jest.fn().mockImplementation(() => 'signed_xml')
const addReferenceStube = jest.fn().mockReturnThis()

jest.mock('xml-crypto', () => {
  return {
    SignedXml: jest.fn().mockImplementation(() => {
      return {
        computeSignature: computeSignatureStub,
        getSignedXml: getSignedXmlStub,
        addReference: addReferenceStube
      }
    })
  }
})

const makeSut = (): XmlSignerAdapter => {
  return new XmlSignerAdapter('any_tag', null, null)
}

describe('XmlSigner Adapter', () => {
  test('Should call SignedXml with correct values', async () => {
    const sut = makeSut()
    const result = await sut.sign('any_xml')
    expect(result).toBe('signed_xml')
  })
})
