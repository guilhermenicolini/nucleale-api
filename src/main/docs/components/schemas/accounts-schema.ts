export const accountsSchema = {
  type: 'array',
  items: {
    $ref: '#components/schemas/account'
  }
}
