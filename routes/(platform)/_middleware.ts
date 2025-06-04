import { FreshContext } from "$fresh/server.ts";

interface State {
  username: string;
}

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  const cookie = req.headers.get("cookie") || "";
  if (!cookie.includes("username=")) {
    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/login");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  } else if (cookie.includes("username=")) {
    ctx.state.username = cookie.split("=")[1];
    const resp = await ctx.next();
    resp.headers.set("Location", "/characters");
    return resp;
  }
}