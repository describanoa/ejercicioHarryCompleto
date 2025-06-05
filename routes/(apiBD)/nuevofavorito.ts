import { FreshContext } from "$fresh/server.ts";
import { collectionFavoritos } from "../../bd.ts";

export async function handler(
  req: Request,
  _ctx: FreshContext<unknown>,
) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const body = await req.json();

  const {modifiedCount} = await collectionFavoritos.updateOne({
    username: body.username,
  }, { $addToSet: { id: body.id } });

  if(!modifiedCount) {
    const { insertedId } = await collectionFavoritos.insertOne({ 
    username: body.username,
    id: [body.id],
   });
   if(!insertedId) {
     return new Response("No se ha podido añadir el favorito", { status: 401 });
   }
   return new Response(JSON.stringify("Favorito añadido"), { status: 200 });
  }
  return new Response(JSON.stringify("Favoritos actualizados"), { status: 200 });
}
