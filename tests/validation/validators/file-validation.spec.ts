import { FileValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const field = 'any'

const makeSut = (): FileValidation => {
  return new FileValidation(field, 2, 'xml')
}

describe('FileValidation', () => {
  test('Should return an error if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: 'any' })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should return an error if field is not array', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: 'any' })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should return an error if field array length is wrong', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: [{}] })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should return an error if field array has wrong mime type', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: [{ mimetype: 'application/xml' }, { mimetype: 'application/json' }] })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should not return on success', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: [{ mimetype: 'application/xml' }, { mimetype: 'application/xml' }] })
    expect(error).toBeFalsy()
  })
})
