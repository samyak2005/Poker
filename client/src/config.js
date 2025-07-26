const config = {
  development: {
    apiUrl: 'http://localhost:3001',
    socketUrl: 'http://localhost:3001'
  },
  production: {
    apiUrl: process.env.VITE_API_URL || 'https://poker-backend.onrender.com',
    socketUrl: process.env.VITE_SOCKET_URL || 'https://poker-backend.onrender.com'
  }
};

const env = import.meta.env.MODE || 'development';

export const API_URL = config[env].apiUrl;
export const SOCKET_URL = config[env].socketUrl; 