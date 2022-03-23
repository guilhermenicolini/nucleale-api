import { IdValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { IdValidatorSpy } from '@/tests/validation/mocks'
import { throwError } from '@/tests/domain/mocks'

const field = 'any'

type SutTypes = {
  sut: IdValidation
  idValidatorSpy: IdValidatorSpy
}

const makeSut = (): SutTypes => {
  const idValidatorSpy = new IdValidatorSpy()
  const sut = new IdValidation(field, idValidatorSpy)
  return {
    sut,
    idValidatorSpy
  }
}

describe('Id Validation', () => {
  test('Should return an error if IdValidator returns false', () => {
    const { sut, idValidatorSpy } = makeSut()
    idValidatorSpy.isIdValid = false
    const id = 'any_id'
    const error = sut.validate({ [field]: id })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should call IdValidator with correct values', () => {
    const { sut, idValidatorSpy } = makeSut()
    const id = 'any_id'
    sut.validate({ [field]: id })
    expect(idValidatorSpy.id).toBe(id)
  })

  test('Should throw if IdValidator throws', () => {
    const { sut, idValidatorSpy } = makeSut()
    jest.spyOn(idValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
