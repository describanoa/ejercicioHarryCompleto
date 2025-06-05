import { FunctionalComponent } from "preact/src/index.d.ts";
import { Signal } from "@preact/signals";


const IslaLogin: FunctionalComponent = () => {

    const usernameSignal = new Signal<string>("");
    const passwordSignal = new Signal<string>("");

    const funcionLogin = async (e: Event) => {
        /*
            1. Comprobar en la BD que el usuario y contraseña son correctos.
            2. Si son correctos, guardar en una cookie el usuario.
            3. Redirigir a la página de personajes.
        */
        e.preventDefault();

        const datosLogin = {
            username: usernameSignal.value,
            password: passwordSignal.value
        }

        const response = await fetch("/comprobarlogin", {
            method: "POST",
            body: JSON.stringify(datosLogin)
        });

        if(response.status === 200) {
            // path = "/" esta disponible en cualquier ruta que empiece por http://localhost:8000/
            // path = "/personajes/famosos" solo está disponible en http://localhost:8000/personajes/famosos/
            document.cookie = `username=${usernameSignal.value}; path=/`;
            globalThis.location.href = "/characters";
        }
        else if(response.status === 400) {
            usernameSignal.value = "";
            passwordSignal.value = "";
            alert("Usuario o contraseña incorrectos");
        }
    }

    return (
        <div class="login">
            <form>
                <label>Username: </label>
                <input type="text" placeholder="Username..." value={usernameSignal} onInput={(e) => usernameSignal.value = e.currentTarget.value} required />
                <br />
                <label>Password: </label>
                <input type="password" placeholder="Password..." value={passwordSignal} onInput={(e) => passwordSignal.value = e.currentTarget.value} required />
                <br />
                <button type="submit" onClick={funcionLogin}>Login</button>
            </form>
            <a href="/register">Crear cuenta</a>
        </div>
    );
}
export default IslaLogin;