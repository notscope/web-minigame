import { useState } from 'react';
import './CoinFlipGame.css';

function CoinFlipGame() {
  const [showResult, setShowResult] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);
  const [duration, setDuration] = useState(1);
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [angle, setAngle] = useState(0);

  function handleFlip() {
    if (flipping) return; // Prevent flipping while already flipping
    setFlipping(true);
    setResult(null);
    setShowResult(false);
    setHasFlipped(true);

    const spins = Math.floor(Math.random() * 8 + 8); // 8 to 15
    const isTails = Math.random() < 0.5; // 50% chance for heads or tails
    const endAngle = isTails ? 180 : 0; // 180 for tails, 0 for heads
    const spinDuration = spins * 0.2; // ~0.2s per full spin

    const totalAngle = angle + (spins * 360) + endAngle;
    setAngle(totalAngle);
    setDuration(spinDuration);


    setTimeout(() => {
      // Determine the actual result based on the angle
      const final = totalAngle % 360;
      const actualResult = final % 360 === 180 ? 'tails' : 'heads';
      setResult(actualResult);
      setShowResult(true); // reveal correct face
      setFlipping(false);
    }, spinDuration * 1000);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className='header'>
          <a href=""></a>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">Coin Flip Game</h1>
        <p className="mb-6">Flip a coin and guess the outcome!</p>
        <div className="coin-container mb-4">
        <div
          className="coin"
          style={{
            transform: `rotateY(${angle}deg)`,
            transition: `transform ${duration}s cubic-bezier(0.2, 1, 0.3, 1)`,
          }}
        >
          {!hasFlipped && <div className="face unknown">?</div>}
          {hasFlipped && (
            <>
              <div className="face heads">Heads</div>
              <div className="face tails">Tails</div>
            </>
          )}
        </div>
        </div>
        <div className="flex w-full gap-4 mt-10">
          <button 
            onClick={handleFlip} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex-1"
          >
            Flip Coin
          </button>
          <button 
            onClick={handleFlip} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex-1"
          >
            Flip Coin
          </button>
        </div>
        {result && (
          <div className="mt-4 text-xl font-bold text-center animate-bounce text-green-600">
            The coin landed on: {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default CoinFlipGame;