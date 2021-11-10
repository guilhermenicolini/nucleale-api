export const searchAccountsSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      accounts: {
        type: 'array',
        items: {
          $ref: '#components/schemas/account'
        }
      },
      address: {
        $ref: '#components/schemas/address'
      },
      childrens: {
        type: 'array',
        items: {
          $ref: '#components/schemas/children'
        }
      }
    }
  }
}
