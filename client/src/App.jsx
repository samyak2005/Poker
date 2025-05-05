import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameRoom from './components/GameRoom';
import PurpleGameRoom from './components/PurpleGameRoom';
import BlueGameRoom from './components/BlueGameRoom';
import LandingPage from './components/LandingPage';
import Lobby from './components/Lobby';

function App() {

  return (
    <BrowserRouter>
          <div className="h-screen flex flex-col relative">
              <div className="relative z-10">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/lobby" element={<Lobby />} />
                  <Route path="/game-room" element={<GameRoom />} />
                  <Route path="/purple-game-room" element={<PurpleGameRoom />} />
                  <Route path="/blue-game-room" element={<BlueGameRoom />} />
                </Routes>
              </div>
          </div>
      </BrowserRouter>
  )
}

export default App
