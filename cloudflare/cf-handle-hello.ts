import { HandlerContext } from 'service-worker-router'
import * as jwt from 'jsonwebtoken'

require('dotenv').config();

export const cfLogin = async (request: typeof HandlerContext): Promise<Response> => {

  // Check for bad request
  if (!request) {
    return new Response('bad request', { status: 400 });
  }

  // JWT
  const key = (request.header.get('Authorization')).substring(7);
  jwt.verify(key, process.env.KEY as string, { maxAge: process.env.TTL, }, (err) => {
    if (err) {
      return new Response('error', { status: 403 });
    }
  });
  return new Response(`Hello ${process.env.USERNAME}`, { status: 200 });
}
