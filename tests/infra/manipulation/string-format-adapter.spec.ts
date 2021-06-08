import { StringFormatAdapter } from '@/infra/manipulation'

const makeSut = (): StringFormatAdapter => new StringFormatAdapter()

describe('StringFormat Adapter', () => {
  describe('format()', () => {
    test('Should not format null value', () => {
      const sut = makeSut()
      const text = sut.format(null)
      expect(text).toBe('')
    })

    test('Should format single parameter', () => {
      const sut = makeSut()
      const text = sut.format('Format this {0}', 'value')
      expect(text).toBe('Format this value')
    })

    test('Should not format on wrong parameter', () => {
      const sut = makeSut()
      const text = sut.format('Format this {1}', 'value')
      expect(text).toBe('Format this {1}')
    })

    test('Should not format on missing parameter', () => {
      const sut = makeSut()
      const text = sut.format('Format this {0} {1}', 'value')
      expect(text).toBe('Format this value {1}')
    })

    test('Should format multiple parameter', () => {
      const sut = makeSut()
      const text = sut.format('Format this {0} {1}', ['key', 'value'])
      expect(text).toBe('Format this key value')
    })
  })

  describe('normalize()', () => {
    test('Should not normalize null string', () => {
      const sut = makeSut()
      const text = sut.normalize(null)
      expect(text).toBe('')
    })

    test('Should normalize all string', () => {
      const sut = makeSut()
      const text = sut.normalize('ÀÁÂÃÄÅĄĀāàáâãäåąßÒÓÔÕÕÖØŐòóôőõöøĎďDŽdžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏĪìíîïīÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚŞšśşŤťŸÝÿýŽŻŹžżźđĢĞģğ')
      expect(text).toBe('AAAAAAAAAAAAAAAASOOOOOOOOOOOOOOODDDZDZEEEEEEEEEEECCCCCCDIIIIIIIIIIUUUUUUUUUULLLLLLNNNNNNRRSSSSSSTTYYYYZZZZZZDGGGG')
    })
  })
})
