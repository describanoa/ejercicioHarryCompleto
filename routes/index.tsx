export function handler() {
    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/login");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
}