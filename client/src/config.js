// API Configuration
// Remove trailing slashes to prevent double slashes in URLs
const cleanUrl = (url) => url?.replace(/\/$/, '') || '';

export const API_URL = cleanUrl(import.meta.env.VITE_API_URL || 'http://localhost:3001');
export const POKER_API_URL = cleanUrl(import.meta.env.VITE_POKER_API_URL || 'http://localhost:3000');

console.log('Multiplayer API URL:', API_URL);
console.log('Poker Game API URL:', POKER_API_URL);
