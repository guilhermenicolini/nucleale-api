import { MongoClient, Collection } from 'mongodb'
import { Mapper } from '@/infra/db/protocols'
import env from '@/main/config/env'

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
    this.client = await MongoClient.connect(env.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  }

  async getCollection (collectionName: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect()
    }

    return this.client.db().collection(collectionName)
  }

  mapCollection (collection: any[], mapper: Mapper): any[] {
    return collection.map(c => mapper.map(c))
  }
}
