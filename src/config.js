export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const baseUri = '"http://localhost:3000'
export const clientId = "70c478e53310457a90b89a6c1732da95";
export const redirectUri = "http://localhost:3000/auth/callback";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-read-private",
    "user-read-email",
    "playlist-modify-private",
    "playlist-modify-public",
    "playlist-read-collaborative",
    "streaming",
    "user-modify-playback-state",
    "user-library-read",
    "user-library-modify",
];
