const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const GOOGLE_LINK_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:5173/oauth/callback&response_type=token&scope=openid%20email%20profile&state=link`;