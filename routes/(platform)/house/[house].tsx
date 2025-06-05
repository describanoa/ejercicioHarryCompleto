import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { collectionFavoritos } from "../../../bd.ts";
import IslaCharacter from "../../../islands/IslaCharacter.tsx";

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
  const { house } = ctx.params;

  const buscarCasaAPI = await Axios.get(
    `https://hp-api.onrender.com/api/characters/house/${house}`,
  );
  const personajes: Character[] = await Promise.all(
    buscarCasaAPI.data.map(async (c: Character) => {
      const buscarFavorito = await collectionFavoritos.findOne({
        username: ctx.state.username,
        id: c.id,
      });
      if (buscarFavorito) {
        return {
          ...c, // Copia todas las propiedades del objeto original
          favorite: true, // Sobrescribe o agrega la propiedad `favorite`
        };
      } else {
        return {
          ...c, // Copia todas las propiedades del objeto original
          favorite: false, // Sobrescribe o agrega la propiedad `favorite`
        };
      }
    }),
  );

  return ctx.render({
    username: ctx.state.username,
    characters: personajes,
  });
}
// VER SI SE PUEDE PONER UN MAXIMO DE RETURN EN LA API
export default function Home(props: PageProps<State>) {
  return <IslaCharacter data={props.data} />;
}
