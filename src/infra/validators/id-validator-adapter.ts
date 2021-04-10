import { IdValidator } from '@/validation/protocols'

import { ObjectId } from 'mongodb'

export class IdValidatorAdapter implements IdValidator {
  isValid (id: string): boolean {
    return ObjectId.isValid(id)
  }
}
