import { TransformerComposite } from '@/data/composites'
import { TransformerSpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: TransformerComposite
  transformerSpies: TransformerSpy[]
}

const makeSut = (): SutTypes => {
  const transformerSpies = [
    new TransformerSpy(),
    new TransformerSpy()
  ]
  const sut = new TransformerComposite(transformerSpies)
  return {
    sut,
    transformerSpies
  }
}

describe('Transformer Composite', () => {
  test('Should throw an error if any transformer fails', () => {
    const { sut, transformerSpies } = makeSut()
    jest.spyOn(transformerSpies[0], 'transform').mockImplementationOnce(throwError)
    try {
      sut.transform('any_data')
    } catch (error) {
      expect(error).toEqual(new Error())
    }
  })

  test('Should throw the first error if more than one transformer fails', () => {
    const { sut, transformerSpies } = makeSut()
    jest.spyOn(transformerSpies[0], 'transform').mockImplementationOnce(() => { throw new Error('Error 1') })
    jest.spyOn(transformerSpies[1], 'transform').mockImplementationOnce(throwError)
    try {
      sut.transform('any_data')
    } catch (error) {
      expect(error).toEqual(new Error('Error 1'))
    }
  })

  test('Should return if all transformers succeeds', () => {
    const { sut } = makeSut()
    const result = sut.transform('any_data')
    const fields = Object.keys(result)
    expect(result).toEqual({
      [fields[0]]: result[fields[0]],
      [fields[1]]: result[fields[1]]
    })
  })
})
