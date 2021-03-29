const BLACKLIST: Array<string> = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
  '12345678909'
]

const verifierDigit = (digits: string): number => {
  const numbers: Array<number> = digits
    .split('')
    .map(number => {
      return parseInt(number, 10)
    })

  const modulus: number = numbers.length + 1
  const multiplied: Array<number> = numbers.map((number, index) => number * (modulus - index))
  const mod: number = multiplied.reduce((buffer, number) => buffer + number) % 11

  return (mod < 2 ? 0 : 11 - mod)
}

export const isValidCpf = (number: string): boolean => {
  if (number.length !== 11 || BLACKLIST.includes(number)) {
    return false
  }

  let numbers: string = number.substr(0, 9)
  numbers += verifierDigit(numbers)
  numbers += verifierDigit(numbers)

  return numbers.substr(-2) === number.substr(-2)
}
