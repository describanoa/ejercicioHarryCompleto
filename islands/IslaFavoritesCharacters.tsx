import { FunctionalComponent } from "preact/src/index.d.ts";
import { Character, State } from "../routes/(platform)/characters.tsx";
import { useState } from "preact/hooks";

type Props = {
  data: State;
};

const IslaFavoritesCharacters: FunctionalComponent<Props> = (props) => {
  const [characters, setCharacters] = useState<Character[]>(
    props.data.characters,
  );

  const quitarFavorito = async (c: Character) => {
    const body = {
      username: props.data.username,
      id: c.id,
    };
    const response = await fetch("/quitarfavorito", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      alert("Error al quitar favorito");
    } else {
      setCharacters(characters.filter((character) => character.id !== c.id));
      if(characters.length === 1) {
        alert("No tienes favoritos, por favor, añade alguno.");
        globalThis.location.href = "/characters";
      }
    }
  };

  return (
    <div class="containerCharacters">
      <div class="titular">
        <p>
          Usuario: <span>{props.data.username}</span>
        </p>
      </div>
      <div class="characters">
        {characters.map((c) => (
          <div class="character" key={c.id}>
            <img src={c.image} alt={c.name} />
            <h3>{c.name}</h3>
            <p>House: <a href={`/house/${c.house}`}>{c.house}</a></p>
            <button type="button" onClick={() => quitarFavorito(c)}>
                ❌ Quitar de favoritos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IslaFavoritesCharacters;
