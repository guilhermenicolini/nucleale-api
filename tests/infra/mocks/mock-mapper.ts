import { Mapper } from '@/infra/db/protocols'

export class MapperSpy implements Mapper {
  map (data: any): any {
    return data
  }
}
