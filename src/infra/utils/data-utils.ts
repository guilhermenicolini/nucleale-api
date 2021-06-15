export const removeTextCharacters = (value: string): string => {
  return value.replace(/&AMP;LT;BR/g, '')
    .replace(/\/&AMP;GT;/g, '')
    .replace('  ', ' ')
}

export const parseMoney = (value: string): number => {
  const v = value.replace(',', '.')
  return parseFloat(v)
}

export const hasValue = (value: any): boolean => {
  if (typeof value === 'object' || value === null || value === undefined) {
    return false
  }

  return value.trim().length > 0
}

export const trimZeros = (value: string): string => {
  return value ? value.trim().replace(/^0+/, '') : ''
}
