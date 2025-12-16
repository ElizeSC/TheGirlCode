// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // or whatever port your frontend runs on
  credentials: true
}));
app.use(express.json());

// Spotify credentials - Store these in environment variables
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

console.log('🔑 Spotify Client ID:', SPOTIFY_CLIENT_ID ? 'Found' : 'Missing');
console.log('🔑 Spotify Secret:', SPOTIFY_CLIENT_SECRET ? 'Found' : 'Missing');
console.log('🌐 Port:', PORT);

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  console.warn('⚠️  Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET. Check backend/.env');
}

// Cache for access token
let spotifyToken = null;
let tokenExpiry = null;

// Get Spotify Access Token
async function getSpotifyToken() {
  // Return cached token if still valid
  if (spotifyToken && tokenExpiry && Date.now() < tokenExpiry) {
    return spotifyToken;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    spotifyToken = data.access_token;
    // Token expires in 1 hour, cache for 55 minutes to be safe
    tokenExpiry = Date.now() + (55 * 60 * 1000);
    
    return spotifyToken;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    throw error;
  }
}

// Search Spotify endpoint
app.get('/api/spotify/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const token = await getSpotifyToken();
    
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=10`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error searching Spotify:', error);
    res.status(500).json({ error: 'Failed to search Spotify' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`🎵 Server is running on port ${PORT}`);
  console.log(`🚀 Ready to search Spotify!`);
});