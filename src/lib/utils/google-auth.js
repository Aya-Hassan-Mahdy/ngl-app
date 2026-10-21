import { OAuth2Client } from "google-auth-library";
import { AppError } from "../error/error.js";
import {env} from "../../lib/config/env.js"

const client = new OAuth2Client(env.google.webClientId)

export async function verifyGoogleToken(idToken) {
  try {  
    const ticket = await client.verifyIdToken({idToken: idToken });
    return ticket.getPayload();

  } catch (err) {
    throw new AppError('invalid google token', 403);
  }
}