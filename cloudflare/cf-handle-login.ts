import { HandlerContext } from 'service-worker-router'
import * as jwt from 'jsonwebtoken'

require('dotenv').config();

export const cfHello = async (request: typeof HandlerContext): Promise<Response> => {

  // Check for bad request
  if (!request) {
    return new Response('bad request', { status: 400 });
  }

  // Verify credentials
  const user = request.headers.get('username') || '';
  if ((user !== process.env.USERNAME as string) || request.headers.get('password') !== process.env.PASSWORD as string) {
    return new Response('invalid login', { status: 403 });
  }

  // JWT
  const token = jwt.sign({
    data: user,
  }, process.env.KEY as string, { expiresIn: process.env.TTL })

  return new Response(token);
}
