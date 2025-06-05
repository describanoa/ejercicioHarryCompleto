import { FunctionalComponent } from "preact/src/index.d.ts";
import { Character, State } from "../routes/(platform)/characters.tsx";
import { useState } from "preact/hooks";

type Props = {
  data: State;
};

const IslaCharacter: FunctionalComponent<Props> = (props) => {
  const [characters, setCharacters] = useState<Character[]>(
    props.data.characters,
  );

  const añadirFavorito = async (c: Character) => {
    const body = {
      username: props.data.username,
      id: c.id,
    };
    const response = await fetch("/nuevofavorito", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      alert("Error al añadir favorito");
    } else {
      setCharacters(
        characters.map((character) =>
          character.id === c.id ? { ...character, favorite: true } : character
        ),
      );
    }
  };

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
      setCharacters(
        characters.map((character) =>
          character.id === c.id ? { ...character, favorite: false } : character
        ),
      );
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
            {!c.favorite
              ? (
                <button type="button" onClick={() => añadirFavorito(c)}>
                  ⭐️ Añadir a favoritos
                </button>
              )
              : (
                <button type="button" onClick={() => quitarFavorito(c)}>
                  ❌ Quitar de favoritos
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IslaCharacter;
