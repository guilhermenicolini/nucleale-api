export const addressSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    accountId: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    number: {
      type: 'string'
    },
    complement: {
      type: 'string'
    },
    district: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    cityId: {
      type: 'number',
      format: 'int32'
    },
    state: {
      type: 'string'
    },
    zip: {
      type: 'string'
    },
    country: {
      type: 'string'
    }
  },
  required: ['id', 'accountId', 'address', 'number', 'district', 'city', 'cityId', 'state', 'zip', 'country']
}
