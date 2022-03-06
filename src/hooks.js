import jwt from 'jsonwebtoken'
import { parse } from 'cookie'
import { connectToDatabase } from '$lib/utils/db.js'
import { ObjectId } from 'mongodb'

export const getSession = async e => {
  let database = await connectToDatabase()
	let cookie = e.request.headers.get("cookie") || ""
  let token = null
	let user
	
  // verify token
  if (cookie) token = await jwt.verify(parse(cookie).jwt, import.meta.env.VITE_JWT_SECRET)
  if (!token) return {
      auth: 'Brak autoryzacji'
  }
  // check if user exists
  if (token) user = await database.db('english-tests').collection('users').findOne({_id: ObjectId(token._id)})
  if (!user) return {
    auth: 'Użytkownik już nie istnieje'
  }

  return {
    auth: 'Zalogowano jako:' + token.email,
    user: token
  }
}