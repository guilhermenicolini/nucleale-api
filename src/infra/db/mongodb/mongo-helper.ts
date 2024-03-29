import { MongoClient, Collection } from 'mongodb'
import { Mapper } from '@/infra/db/protocols'
import env from '@/main/config/env'
import { idMapper } from './mongo-util'

export class MongoHelper {
  private client: MongoClient = null
  private static _instance: MongoHelper

  private constructor () { }

  static get instance (): MongoHelper {
    if (!MongoHelper._instance) {
      MongoHelper._instance = new MongoHelper()
    }
    return MongoHelper._instance
  }

  async connect (): Promise<void> {
    this.client = await MongoClient.connect(env.mongoUrl)
  }

  async disconnect (): Promise<void> {
    await this.client?.close()
    this.client = null
  }

  async getCollection (collectionName: string): Promise<Collection> {
    if (!this.client) {
      await this.connect()
    }

    return this.client.db().collection(collectionName)
  }

  map (object: any, mapper: Mapper = idMapper()): any {
    return mapper.map(object)
  }

  mapCollection (collection: any[], mapper: Mapper = idMapper()): any[] {
    return collection.map(c => mapper.map(c))
  }
}
