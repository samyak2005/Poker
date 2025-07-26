import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import MultiplayerLobby from './components/pages/MultiplayerLobby';
import MultiplayerGameRoom from './components/pages/MultiplayerGameRoom';

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col relative">
          <div>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/multiplayer-lobby" element={<MultiplayerLobby />} />
              <Route path="/multiplayer-game" element={<MultiplayerGameRoom />} />
            </Routes>
          </div>
      </div>
    </BrowserRouter>
  )
}

export default App
