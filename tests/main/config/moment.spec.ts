import MockDate from 'mockdate'
import moment from 'moment-timezone'

describe('Moment Timezone', () => {
  test('Should load date and time without zone', () => {
    const date = moment('31/12/2021 23:59:59', 'DD/MM/YYYY HH:mm:ss')
    expect(date.valueOf()).toBe(1640995199000)
  })

  test('Should load now date and time whithout zone', () => {
    MockDate.set('2020-01-31T14:15:16Z')
    const now = moment()
    expect(now.valueOf()).toBe(1580480116000)
  })

  test('Should load brazil timespan without zone', () => {
    const dateInBrazil = 1581649200000 // date: 14/02/2020 00:00
    const date = moment(dateInBrazil)
    expect(date.format('YYYY-MM-DDTHH:mm')).toBe('2020-02-14T03:00')
  })
})
