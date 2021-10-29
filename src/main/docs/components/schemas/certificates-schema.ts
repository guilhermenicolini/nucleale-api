export const certificatesSchema = {
  type: 'array',
  items: {
    $ref: '#components/schemas/certificate'
  }
}
