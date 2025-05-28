import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainGameRoom from './components/pages/MainGameRoom';
import LandingPage from './components/pages/LandingPage';
import Lobby from './components/pages/Lobby';

function App() {

  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col relative">
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/game-room" element={<MainGameRoom />} />
            </Routes>
          </div>
      </div>
    </BrowserRouter>
  )
}

export default App
