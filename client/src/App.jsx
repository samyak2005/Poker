import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameRoom from './components/GameRoom';
import Help from './components/Help';

function App() {

  return (
    <BrowserRouter>
          <div className="h-screen flex flex-col relative">
              <div className="relative z-10">
                <Routes>
                  <Route path="/game-room" element={<GameRoom />} />
                  <Route path="/help" element={<Help />} />
                </Routes>
              </div>
          </div>
      </BrowserRouter>
  )
}

export default App
