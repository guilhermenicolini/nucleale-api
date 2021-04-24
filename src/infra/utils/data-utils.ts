export const removeTextCharacters = (value: string): string => {
  return value.replace(/&AMP;LT;BR/g, '')
    .replace(/\/&AMP;GT;/g, '')
    .replace('  ', ' ')
}

export const parseMoney = (value: string): number => {
  const v = value.replace(',', '.')
  return parseFloat(v)
}
