// import cookie from 'cookie';
// import { v4 as uuid } from '@lukeed/uuid';

// export const handle = async ({ event, resolve }) => {
// 	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
// 	event.locals.userid = cookies.userid || uuid();

// 	const response = await resolve(event);

// 	if (!cookies.userid) {
// 		// if this is the first time the user has visited this app,
// 		// set a cookie so that we recognise them when they return
// 		response.headers.set(
// 			'set-cookie',
// 			cookie.serialize('userid', event.locals.userid, {
// 				path: '/',
// 				httpOnly: true
// 			})
// 		);
// 	}

// 	return response;
// };




// import jwt from 'jsonwebtoken'
// import { parse } from 'cookie'
// import { connectToDatabase } from '$lib/utils/db.js'
// import { ObjectId } from 'mongodb'

// export const getSession = async ({ request, url, params, locals }) => {
//   let database = await connectToDatabase()

//   // verify token
//   let token
//   if (request.headers.cookie) token = await jwt.verify(parse(request.headers.cookie).jwt, import.meta.env.VITE_JWT_SECRET)
//   if (!token) return {
//     body: {
//       auth: 'Brak autoryzacji'
//     }
//   }
//   // check if user exists
//   let user
//   if (token) user = await database.db('sample_airbnb').collection('users').findOne({_id: ObjectId(token._id)})
//   if (!user) return {
//     body: {
//       auth: 'Użytkownik już nie istnieje'
//     }
//   }

//   return {
//     body: {
//       auth: 'Zalogowano jako:' + token.email,
//       user: token
//     }
//   }
// }