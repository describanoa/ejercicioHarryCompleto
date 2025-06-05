import { FreshContext, PageProps } from "$fresh/server.ts";
import { collectionLogin } from "../../bd.ts";
import IslaProfile from "../../islands/IslaProfile.tsx";

export type State = {
  username: string;
  name: string;
  email: string;
};

export async function handler(
  _req: Request,
  ctx: FreshContext<State>,
) {
  const userBD = await collectionLogin.findOne({
    username: ctx.state.username,
  });

  return ctx.render({
    username: ctx.state.username,
    name: userBD?.name || "",
    email: userBD?.email || "",
  });
}
// VER SI SE PUEDE PONER UN MAXIMO DE RETURN EN LA API
export default function Home(props: PageProps<State>) {
  return <IslaProfile data={props.data} />
}
