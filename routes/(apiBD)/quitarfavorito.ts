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

  const { modifiedCount } = await collectionFavoritos.updateOne({
    username: body.username,
  }, { $pull: { id: body.id } });

  if (!modifiedCount) {
    return new Response(JSON.stringify("No se ha podido borrar el favorito"), {
      status: 400,
    });
  }
  return new Response(JSON.stringify("Favoritos actualizados"), {
    status: 200,
  });
}