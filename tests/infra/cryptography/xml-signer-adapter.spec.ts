import { XmlSignerAdapter } from '@/infra/cryptography'
import { FileStorageSpy } from '@/tests/infra/mocks'

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

type SutTypes = {
  sut: XmlSignerAdapter,
  fileStorageSpy: FileStorageSpy
}

const makeSut = (): SutTypes => {
  const fileStorageSpy = new FileStorageSpy()
  const sut = new XmlSignerAdapter('any_tag', fileStorageSpy)
  return {
    sut,
    fileStorageSpy
  }
}

describe('XmlSigner Adapter', () => {
  describe('sign()', () => {
    test('Should call SignedXml with correct values', async () => {
      const { sut } = makeSut()
      await sut.sign('any_xml')
      expect(computeSignatureStub).toHaveBeenCalledWith('any_xml')
    })

    test('Should return a signed xml on success', async () => {
      const { sut } = makeSut()
      const result = await sut.sign('any_xml')
      expect(result).toBe('signed_xml')
    })
  })
})
