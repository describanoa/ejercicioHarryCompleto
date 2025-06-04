import { FreshContext } from "$fresh/server.ts";
import {collectionLogin} from "../../bd.ts";

export async function handler(
  req: Request,
  _ctx: FreshContext<unknown>,
) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const body = await req.json();
  
  const filteredDocs = await collectionLogin.findOne({ username: body.username, password: body.password });
  if (!filteredDocs) {
    return new Response("Invalid username or password", { status: 400 });
  }
  return new Response(JSON.stringify("Login successful"), { status: 200 });
}