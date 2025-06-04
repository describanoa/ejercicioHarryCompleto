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

  const filteredDocs = await collectionLogin.findOne({
    username: body.username,
  });
  if (filteredDocs) {
    return new Response("Username exists", { status: 400 });
  }

  const { insertedId } = await collectionLogin.insertOne({ 
    name: body.name,
    username: body.username,
    password: body.password,
    email: body.email,
   });
  if (!insertedId) {
    return new Response("No se ha podido registrar", { status: 401 });
  }
  return new Response(JSON.stringify("Register successful"), { status: 200 });
}
