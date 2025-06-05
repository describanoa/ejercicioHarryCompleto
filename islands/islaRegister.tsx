import { FunctionalComponent } from "preact/src/index.d.ts";
import { Signal } from "@preact/signals";

const IslaRegister: FunctionalComponent = () => {
  const nameSignal = new Signal<string>("");
  const usernameSignal = new Signal<string>("");
  const passwordSignal = new Signal<string>("");
  const emailSignal = new Signal<string>("");

  const funcionRegister = async () => {
    /*
        1. Comprobar en la BD que el usuario no coincida con otro registrado.
        2. Si no existe, guardar el usuario en la BD.
        3. Crer una cookie con el nombre de usuario.
        4. Redirigir a la página de personajes.
    */

    const datosRegister = {
      name: nameSignal.value,
      username: usernameSignal.value,
      password: passwordSignal.value,
      email: emailSignal.value,
    };

    const response = await fetch("/comprobarregistro", {
      method: "POST",
      body: JSON.stringify(datosRegister),
    });

    if (response.status === 200) {
      // path = "/" esta disponible en cualquier ruta que empiece por http://localhost:8000/
      // path = "/personajes/famosos" solo está disponible en http://localhost:8000/personajes/famosos/
      document.cookie = `username=${usernameSignal.value}; path=/`;
      globalThis.location.href = "/characters";
    } else if (response.status === 400) {
      usernameSignal.value = "";
      alert("Usuario ya existente");
    } else if (response.status === 401) {
      nameSignal.value = "";
      usernameSignal.value = "";
      passwordSignal.value = "";
      emailSignal.value = "";
      alert("Error de registro");
    }
  };

  return (
    <div class="register">
      <form>
        <label>Name: </label>
        <input
          type="text"
          placeholder="Name..."
          value={nameSignal}
          onInput={(e) => nameSignal.value = e.currentTarget.value}
          required
        />
        <br />
        <label>Username: </label>
        <input
          type="text"
          placeholder="Username..."
          value={usernameSignal}
          onInput={(e) => usernameSignal.value = e.currentTarget.value}
          required
        />
        <br />
        <label>Password: </label>
        <input
          type="password"
          placeholder="Password..."
          value={passwordSignal}
          onInput={(e) => passwordSignal.value = e.currentTarget.value}
          required
        />
        <br />
        <label>Email: </label>
        <input
          type="email"
          placeholder="Email..."
          value={emailSignal}
          onInput={(e) => emailSignal.value = e.currentTarget.value}
          required
        />
        <br />
        <button type="button" onClick={funcionRegister}>Crear cuenta</button>
      </form>
      <a href="/login">Iniciar sesión</a>
    </div>
  );
};
export default IslaRegister;
