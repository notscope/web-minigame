import { useState } from 'react';
import { Link } from "react-router-dom";
import './CoinFlipGame.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function CoinFlipGame() {
  const [userChoice, setUserChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);
  const [duration, setDuration] = useState(1);
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [angle, setAngle] = useState(0);

  function handleFlip(choice) {
    if (flipping) return; // Prevent flipping while already flipping
    setFlipping(true);
    setResult(null);
    setShowResult(false);
    setHasFlipped(true);
    setUserChoice(choice);

    console.log('User choice:', choice);

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
      if (actualResult == userChoice) {
        console.log('Result:', actualResult)
        console.log('You guessed correctly!');
      } else {
        console.log('Result:', actualResult)
        console.log('You guessed incorrectly.');
      }
    }, spinDuration * 1000);
  }

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg">
          <div className='header bg-gray-200 p-4'>
            <Link to="/" className="text-blue-500 hover:underline"><FontAwesomeIcon icon={faArrowLeft} /> Back to Home</Link>
          </div>
          <div className="main p-8">
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
                onClick={handleFlip.bind(null, 'heads')} 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex-1"
              >
                Head
              </button>
              <button 
                onClick={handleFlip.bind(null, 'tails')} 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex-1"
              >
                Tail
              </button>
            </div>
            {showResult && (
              <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                  <h2 className="text-xl font-bold mb-4">Result</h2>
                  <p className="mb-2">You guessed: <span className="font-semibold">{userChoice}</span></p>
                  <p className="mb-2">The coin landed on: <span className="font-semibold">{result}</span></p>
                  {result === userChoice ? (
                    <p className="text-green-600 font-semibold mt-2">🎉 You guessed correctly!</p>
                  ) : (
                    <p className="text-red-600 font-semibold mt-2">❌ You guessed incorrectly.</p>
                  )}
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      setShowResult(false);
                      setHasFlipped(false);
                      setUserChoice(null);
                      setResult(null);
                      setAngle(0);
                    }}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
}

export default CoinFlipGame;