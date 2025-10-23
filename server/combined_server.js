/**
 * Combined Server - Runs both API and Multiplayer servers
 * This file starts both servers needed for the complete poker game:
 * - Port 3000: REST API for single-player mode
 * - Port 3001: Socket.IO for multiplayer mode
 */

const { fork } = require('child_process');
const path = require('path');

console.log('🚀 Starting ChipInn Poker Servers...\n');

// Start the API server (port 3000)
const apiServer = fork(path.join(__dirname, 'best-hand_API.js'));
console.log('✅ API Server process started (Port 3000)');

// Start the multiplayer server (port 3001)
const multiplayerServer = fork(path.join(__dirname, 'multiplayer_server.js'));
console.log('✅ Multiplayer Server process started (Port 3001)');

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  apiServer.kill();
  multiplayerServer.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down servers...');
  apiServer.kill();
  multiplayerServer.kill();
  process.exit();
});

// Handle child process exits
apiServer.on('exit', (code) => {
  console.log(`❌ API Server exited with code ${code}`);
  if (code !== 0) {
    console.log('Restarting API server...');
    fork(path.join(__dirname, 'best-hand_API.js'));
  }
});

multiplayerServer.on('exit', (code) => {
  console.log(`❌ Multiplayer Server exited with code ${code}`);
  if (code !== 0) {
    console.log('Restarting Multiplayer server...');
    fork(path.join(__dirname, 'multiplayer_server.js'));
  }
});

console.log('\n✨ Both servers are running!');
console.log('📡 API Server: Port 3000');
console.log('🎮 Multiplayer Server: Port 3001');
console.log('\nPress Ctrl+C to stop all servers\n');
