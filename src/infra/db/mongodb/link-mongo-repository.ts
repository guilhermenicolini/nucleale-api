import { MongoHelper } from '@/infra/db'
import {
  AddLinkRepository,
  LoadLinkRepository,
  DeleteLinkRepository
} from '@/data/protocols'
import { ObjectId } from 'mongodb'

import moment from 'moment-timezone'

export class LinkMongoRepository implements
  AddLinkRepository,
  LoadLinkRepository,
  DeleteLinkRepository {
  async add (data: AddLinkRepository.Params): Promise<AddLinkRepository.Result> {
    const linksCollection = await MongoHelper.instance.getCollection('links')
    const expiration = moment().add(1, 'hour').valueOf()
    const cmd = await linksCollection.insertOne(
      {
        userId: new ObjectId(data.id),
        type: data.type,
        expiration
      })
    return {
      link: cmd.insertedId.toString(),
      expiration
    }
  }

  async load (data: LoadLinkRepository.Params): Promise<LoadLinkRepository.Result> {
    const linksCollection = await MongoHelper.instance.getCollection('links')
    const link = await linksCollection.findOne<LoadLinkRepository.Result>({
      _id: new ObjectId(data.token),
      type: data.type
    })
    return link
  }

  async delete (token: string): Promise<void> {
    const linksCollection = await MongoHelper.instance.getCollection('links')
    await linksCollection.findOneAndDelete({
      _id: new ObjectId(token)
    })
  }
}
