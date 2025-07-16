import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Home from './pages/Home.jsx'
import CoinflipGame from './pages/CoinFlipGame.jsx'
import CupGame from './pages/CupGame.jsx'
import SpinnerGame from './pages/SpinnerGame.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coinflip" element={<CoinflipGame />} />
        <Route path="/cupgame" element={<CupGame />} />
        <Route path="/spinnergame" element={<SpinnerGame />} />
      </Routes>
    </Router>
  );
}

export default App