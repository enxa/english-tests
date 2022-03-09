import { connectToDatabase } from '$lib/utils/db.js'

export let get = async e => {
  // let bedrooms  = Number(query.get('bedrooms'))
  // let bathrooms = Number(query.get('bathrooms'))
  let skip  = Number(e.url.searchParams.get('skip'))
  let limit = Number(e.url.searchParams.get('limit'))
  // console.log('skip', skip)

  let dbQuery = [
    { },
    { projection: { _id: 0 } }
  ]

  let database = await connectToDatabase()
  let result = await database.db('english-tests').collection('meanings-by-word').find(...dbQuery)
  .skip(skip)
  .limit(limit)
  .toArray()

  return {
    body: result
  }
}