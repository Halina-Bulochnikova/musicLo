function generateCodeVerifier(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Динамічний redirect URI
const redirect_uri =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:5174"
    : "https://music-lo-red.vercel.app";

// Авторизація: редірект на Spotify
export async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri,
    scope: "user-read-private user-read-email",
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

// Отримання access token
export async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");

  window.history.replaceState({}, document.title, "/dashboard");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirect_uri);
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!result.ok) {
    const errorText = await result.text();
    console.error("Token error response:", errorText);
    throw new Error("Token error");
  }

  const { access_token } = await result.json();
  localStorage.setItem("spotify_access_token", access_token);
  return access_token;
}

// Обробка помилки 401
export async function handleProfileError(profileRes) {
  if (profileRes.status === 401) {
    localStorage.removeItem("spotify_access_token");
    window.location.reload(); // або повторна авторизація
  }
}
