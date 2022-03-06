import dotenv from 'dotenv'
dotenv.config()

import { MongoClient } from 'mongodb'

let cached = global.mongo
if (!cached) cached = global.mongo = null

export async function connectToDatabase() {
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

// Global is used here to maintain a cached connection across hot reloads in development. 
// This prevents connections growing exponentially during API Route usage.