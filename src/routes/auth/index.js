import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { serialize } from 'cookie'
import { connectToDatabase } from '$lib/utils/db.js'

export const post = async e => {
  const req = await e.request.json()
  const email = req.email
  const password = req.password

  let database = await connectToDatabase()
  // check if user exists
  let user = await database.db('sample_airbnb').collection('users').findOne({email})
  if (user) return {
    body: {
      auth: 'Email zarezerwowany'
    }
  } 
  // hash password
  let hashed = await bcrypt.hash(password, 10)
  if (!hashed) return {
    body: {
      auth: 'Błąd szyfrowana'
    }
  }
  // save user to db
  let result = await database.db('sample_airbnb').collection('users').insertOne({email: email, password: hashed})
  if (result.acknowledged) return {
    body: {
      auth: 'Zarejestrowano'
    }
  }
}

export const put = async e => {
  const req = await e.request.json()
  const email = req.email
  const password = req.password

  let database = await connectToDatabase()
  // check if user exists
  let user = await database.db('sample_airbnb').collection('users').findOne({email})
  if (!user) return {
    body: {
      auth: 'Niepoprawny email lub hasło'
    }
  }
  // compare password
  let compared = await bcrypt.compare(password, user.password)
  if (!compared) return {
    body: {
      auth: 'Niepoprawny email lub hasło'
    }
  }
  // send token
	let token = await jwt.sign({ _id: user._id, email: user.email }, import.meta.env.VITE_JWT_SECRET, { expiresIn: import.meta.env.VITE_JWT_EXPIRES_IN })
  if (token) return {
    headers: {
      'Set-Cookie': serialize('jwt', token, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // one week,
      })
    },
    body: {
      auth: 'Zalogowano',
    }
  }
}

export let del = async e  => {
  return {
    headers: {
      'Set-Cookie': serialize('jwt', '', {
        path: '/',
        httpOnly: true,
        maxAge: 0
      })
    },
    body: {
      auth: 'Wylogowano',
    }
  }
}