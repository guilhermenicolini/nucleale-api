export const invoicesSchema = {
  type: 'array',
  items: {
    $ref: '#components/schemas/invoice'
  }
}
