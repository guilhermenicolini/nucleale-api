import { IoLoadInvoices } from '@/data/usecases'
import { DecrypterSpy, TransformerSpy } from '@/tests/data/mocks'
import { mockXmlFileBuffer } from '@/tests/domain/mocks'

const mockBuffer = (): Buffer => {
  return mockXmlFileBuffer().buffer
}

type SutTypes = {
  sut: IoLoadInvoices,
  decrypterSpy: DecrypterSpy,
  transformerSpy: TransformerSpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const transformerSpy = new TransformerSpy()
  const sut = new IoLoadInvoices(decrypterSpy, transformerSpy)
  return {
    sut,
    decrypterSpy,
    transformerSpy
  }
}

describe('IoLoadInvoices Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterSpy } = makeSut()
    const buffer = mockBuffer()
    await sut.load(buffer)
    expect(decrypterSpy.ciphertext).toEqual(buffer)
  })
})
