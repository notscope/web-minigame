import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Home from './pages/Home.jsx'
import CoinFlip from './pages/CoinFlip.jsx'
import CupGame from './pages/CupGame.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coinflip" element={<CoinFlip />} />
        <Route path="/cupgame" element={<CupGame />} />
      </Routes>
    </Router>
  );
}

export default App
