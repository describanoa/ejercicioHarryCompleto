import { FunctionalComponent } from "preact/src/index.d.ts";
import { Character, State } from "../routes/(platform)/characters.tsx";
//import { Signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

type Props = {
  data: State;
};

const IslaCharacter: FunctionalComponent<Props> = (props) => {
  //const signalCharacters = new Signal<Character[]>(props.data.characters);

  const mostrarCharacters = () => {
    return(
      <>
        {props.data.characters.map((c) => (
          <div class="character" key={c.id}>
            <img src={c.image} alt={c.name} />
            <h3>{c.name}</h3>
            <p>House: {c.house}</p>
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
      </>
    );
  }

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
      const updatedCharacters = props.data.characters.map((character) =>
        character.id === c.id ? { ...character, favorite: true } : character
      );
      props.data.characters = updatedCharacters;
      alert("Favorito añadido correctamente");
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
      const updatedCharacters = props.data.characters.map((character) =>
        character.id === c.id ? { ...character, favorite: false } : character
      );
      props.data.characters = updatedCharacters;
      alert("Favorito eliminado correctamente");
    }
  };

  useEffect(() => {
    mostrarCharacters();
  }, [props.data.characters]);

  return (
    <div class="containerCharacters">
      <div class="titular">
        <p>Usuario: <span>{props.data.username}</span></p>
      </div>
      <div class="characters">
        {props.data.characters.length > 0 ? mostrarCharacters() : <p>No hay personajes disponibles.</p>}
      </div>
    </div>
  );
};

export default IslaCharacter;
