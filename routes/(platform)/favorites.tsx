import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { collectionFavoritos } from "../../bd.ts";
import IslaFavoritesCharacters from "../../islands/IslaFavoritesCharacters.tsx";

export type State = {
  username: string;
  characters: Character[];
};

export type Character = {
  id: string;
  name: string;
  house: string;
  image: string;
  favorite?: boolean;
};

export async function handler(
  _req: Request,
  ctx: FreshContext<State>,
) {
  let personajes: Character[] = [];

  const buscarFavorito = await collectionFavoritos.findOne({
    username: ctx.state.username,
  });
  if (!buscarFavorito) {
    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/login");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  } else {
    if(!buscarFavorito.id || buscarFavorito.id.length === 0) {
      // Redirect user to characters page.
      const headers = new Headers();
      headers.set("location", "/characters");
      return new Response(null, {
        status: 303, // See Other
        headers,
      });
    }
    personajes = await Promise.all(buscarFavorito.id.map(async (id: string) => {
      const charactersAPI = await Axios.get(
        `https://hp-api.onrender.com/api/character/${id}`,
      );
      const characterData = charactersAPI.data[0];

      // Add the character to the context state
      return ({
        id: characterData.id,
        name: characterData.name,
        house: characterData.house,
        image: characterData.image,
        favorite: true,
      });
    }));
  }

  return ctx.render({
    username: ctx.state.username,
    characters: personajes
  });
}
// VER SI SE PUEDE PONER UN MAXIMO DE RETURN EN LA API
export default function Home(props: PageProps<State>) {
  return <IslaFavoritesCharacters data={props.data} />;
}
