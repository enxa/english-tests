import meaningsByWord from '../../data/toeic-meanings-by-word.js'
import wordsByMeaning from '../../data/toeic-words-by-meaning.js'

import dotenv from 'dotenv'
dotenv.config()

import { MongoClient } from 'mongodb'

let cached = global.mongo
if (!cached) cached = global.mongo = null
async function connectToDatabase() {
  if (cached) {
    return cached
  } else {
    try {
      cached = await MongoClient.connect(import.meta.env.VITE_MONGODB_URI)
      console.log(`MongoDB Connected`)
      return  cached
    } catch(error) {
      console.error(`MongoDB Error: ${error.message}`)
      process.exit(1)
    }
  }
}

let database = await connectToDatabase()

let importData = async () => {
  try {
    await database.db('english-tests').collection('meanings-by-word').insertMany(meaningsByWord)
    await database.db('english-tests').collection('words-by-meaning').insertMany(wordsByMeaning)
  
    console.log('Data imported')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

let deleteData = async () => {
  try {
    await database.db('english-tests').collection('meanings-by-word').deleteMany(meaningsByWord)
    await database.db('english-tests').collection('words-by-meaning').deleteMany(wordsByMeaning)

    console.log('Data deleted')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  // console.log(meaningsByWord, wordsByMeaning)
  importData()
}
if (process.argv[2] === '-d') {
  deleteData()
}
