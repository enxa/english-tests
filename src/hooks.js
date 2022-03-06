import jwt from 'jsonwebtoken'
import { parse } from 'cookie'
import { connectToDatabase } from '$lib/utils/db.js'
import { ObjectId } from 'mongodb'

export const getSession = async e => {
  let database = await connectToDatabase()

  // verify token
  let token = null
	let cookie = e.request.headers.get("cookie") || ""

  if (cookie) token = await jwt.verify(parse(cookie).jwt, import.meta.env.VITE_JWT_SECRET)
  if (!token) return {
      auth: 'Brak autoryzacji'
  }
  // check if user exists
  let user
  if (token) user = await database.db('sample_airbnb').collection('users').findOne({_id: ObjectId(token._id)})
  if (!user) return {
    auth: 'Użytkownik już nie istnieje'
  }

  return {
    auth: 'Zalogowano jako:' + token.email,
    user: token
  }
}