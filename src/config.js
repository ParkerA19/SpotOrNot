export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const baseUri = '"http://localhost:3000'
export const clientId = "";
export const redirectUri = "http://localhost:3000/auth/callback";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-read-private",
    "user-read-email",
    "playlist-modify-private",
    "playlist-read-collaborative",
];
