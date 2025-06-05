import { FunctionalComponent } from "preact/src/index.d.ts";
import { State } from "../routes/(platform)/profile.tsx";

type Props = {
  data: State;
};


const IslaProfile: FunctionalComponent<Props> = (props) => {

    const funcionCerrarSesion = (e: Event) => {
        e.preventDefault();
        document.cookie = `username=${props.data.username}; Expires=Thu, 05 Jun 2025 00:00:00 UTC; path=/`;
        globalThis.location.href = "/";
    }

    return (
        <div class="profile">
            <p>Username: <span>{props.data.username}</span></p>
            <p>Name: <span>{props.data.name}</span></p>
            <p>Email: <span>{props.data.email}</span></p>
            <button type="submit" onClick={funcionCerrarSesion}>Cerrar sesión</button>
        </div>
    );
}
export default IslaProfile;