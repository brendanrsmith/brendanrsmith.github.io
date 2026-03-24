#!/usr/bin/env bun
/**
 * One-time OAuth flow to get tokens with activity:read_all scope.
 * Usage: bun scripts/strava-auth.ts
 *
 * 1. Opens the Strava authorization URL (or prints it)
 * 2. Starts a local server on :3000 to catch the redirect
 * 3. Exchanges the code for tokens and prints them
 */

const CLIENT_ID = process.env.STRAVA_CLIENT_ID!;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET!;
const REDIRECT_URI = "http://localhost:3000/callback";

const authUrl =
  `https://www.strava.com/oauth/authorize` +
  `?client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=code` +
  `&approval_prompt=force` +
  `&scope=activity:read_all`;

console.log("\nOpen this URL in your browser:\n");
console.log(authUrl);
console.log("\nWaiting for callback on http://localhost:3000/callback ...\n");

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname !== "/callback") {
      return new Response("Not found", { status: 404 });
    }

    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    if (error || !code) {
      server.stop();
      return new Response(`Auth error: ${error}`, { status: 400 });
    }

    const res = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await res.json();

    console.log("Success! Update your .env with:\n");
    console.log(`STRAVA_ACCESS_TOKEN=${tokens.access_token}`);
    console.log(`STRAVA_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log();

    server.stop();
    return new Response("<h2>Done! You can close this tab.</h2>", {
      headers: { "Content-Type": "text/html" },
    });
  },
});
