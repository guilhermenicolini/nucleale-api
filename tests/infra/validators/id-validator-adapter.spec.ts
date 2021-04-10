import { IdValidatorAdapter } from '@/infra/validators'

import { ObjectId } from 'mongodb'

const makeSut = (): IdValidatorAdapter => {
  return new IdValidatorAdapter()
}

describe('IdValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(ObjectId, 'isValid').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_id')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    jest.spyOn(ObjectId, 'isValid').mockReturnValueOnce(true)
    const isValid = sut.isValid('valid_id')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    const isIdSpy = jest.spyOn(ObjectId, 'isValid')
    sut.isValid('any_id')
    expect(isIdSpy).toHaveBeenCalledWith('any_id')
  })
})
