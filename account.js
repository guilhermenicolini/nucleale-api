const { MongoClient, ObjectId } = require('mongodb')
const moment = require('moment-timezone')

const url = 'mongodb+srv://FJu2uvQs:ohT9BQeSdGrhcTAp@nucleale.ffh6g.mongodb.net/production?retryWrites=true&w=majority'
const client = new MongoClient(url, {
  useUnifiedTopology: true
})

const cityIds = {
  campinas: 6291,
  saoPaulo: 7107,
  valinhos: 7225,
  jaguariuna: 6595,
  sumare: 7149,
  vinhedo: 7237,
  paulinia: 6831,
  cosmopolis: 6357
}

const genders = {
  male: 'male',
  female: 'female'
}

const data = {
  users: [
    {
      taxId: '93539738215',
      name: 'Marcilyanne Moreira Gois',
      email: 'lianigois@gmail.com',
      mobilePhone: '+5516981362874',
      birth: moment.utc('1987-03-30').valueOf()
    }
  ],
  address: {
    address: 'Rua Barão de Ataliba',
    number: '155',
    complement: 'ap 133',
    district: 'Cambuí',
    city: 'Campinas',
    cityId: cityIds.campinas,
    state: 'SP',
    zip: '13024140'
  },
  children: {
    name: 'Alberto Yukinobu Hata',
    birth: moment.utc('2021-09-15').valueOf(),
    gender: genders.male
  }
}

async function main () {
  await client.connect()
  const db = client.db()

  const accountsCollection = db.collection('accounts')
  const addressesCollection = db.collection('addresses')
  const childrensCollection = db.collection('childrens')

  const accountId = new ObjectId()

  for (const user of data.users) {
    const cmd = await accountsCollection.insertOne({ accountId, ...user, status: 'active', role: 'user' })
    console.log(cmd)
  }

  await addressesCollection.insertOne({ accountId, ...data.address, country: 'BR' })

  if (data.children) {
    await childrensCollection.insertOne({ accountId, ...data.children })
  }
}

main().then(() => console.log('finish'))
