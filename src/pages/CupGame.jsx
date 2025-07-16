import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const NUM_CUPS = 3;
const CUP_WIDTH = 100;
const CUP_GAP = 32;

function CupGame() {
  const [positions, setPositions] = useState([...Array(NUM_CUPS).keys()]);
  const [ballIndex, setBallIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [showBall, setShowBall] = useState(true);

  const handleShuffle = async () => {
    setRevealed(false);
    setSelected(null);
    setShowBall(true);
    await new Promise((r) => setTimeout(r, 1000)); // Show initial ball

    setShowBall(false);
    setShuffling(true);

    let newPositions = [...positions];
    let currentBallIndex = ballIndex;

    for (let i = 0; i < 6; i++) {
      const a = Math.floor(Math.random() * NUM_CUPS);
      let b;
      do {
        b = Math.floor(Math.random() * NUM_CUPS);
      } while (a === b);

      // Swap positions visually
      [newPositions[a], newPositions[b]] = [newPositions[b], newPositions[a]];

      // Update ballIndex accordingly
      if (currentBallIndex === a) currentBallIndex = b;
      else if (currentBallIndex === b) currentBallIndex = a;

      setPositions([...newPositions]);
      setBallIndex(currentBallIndex);
      await new Promise((r) => setTimeout(r, 600));
    }

    setShuffling(false);
  };

  const handleCupClick = (i) => {
    if (shuffling || revealed) return;
    setSelected(i);
    setRevealed(true);
  };

  useEffect(() => {
    const randomStart = Math.floor(Math.random() * NUM_CUPS);
    setBallIndex(randomStart);
    setPositions([...Array(NUM_CUPS).keys()]);
    handleShuffle();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="mx-auto bg-white rounded-lg shadow-lg">
            <div className='header bg-gray-200 p-4'>
                <Link to="/" className="text-blue-500 hover:underline">
                    <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
                </Link>
            </div>
            <div className="main bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl justify-center text-center">
              <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">Cup Game</h1>
              <p className="mb-6 text-lg text-gray-700">Track the ball!</p>

              <div className="relative h-40 mb-6" style={{ width: `${NUM_CUPS * (CUP_WIDTH + CUP_GAP)}px` }}>
                {[...Array(NUM_CUPS)].map((_, idx) => {
                  const cupPos = positions[idx];
                  const left = cupPos * (CUP_WIDTH + CUP_GAP);

                  return (
                    <button
                      key={idx}
                      onClick={() => handleCupClick(idx)}
                      disabled={shuffling || revealed}
                      className={`absolute transition-all duration-500 ease-in-out`}
                      style={{ left, width: CUP_WIDTH }}
                    >
                      <div className="relative w-[100px] h-32 flex flex-col items-center justify-end rounded-b-full bg-yellow-400 shadow-lg">
                        <div className="w-[100px] h-24 rounded-t-full bg-yellow-500 absolute top-0 left-0"></div>

                        {/* Ball logic */}
                        {((showBall && ballIndex === idx) || (revealed && selected === idx && ballIndex === idx)) && (
                          <div className="w-8 h-8 bg-red-500 rounded-full absolute bottom-4 left-1/2 -translate-x-1/2 shadow-lg z-10"></div>
                        )}

                        {revealed && selected === idx && ballIndex !== idx && (
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xl">❌</div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              {revealed && (
              <div className="text-xl font-semibold mb-4 text-gray-800">
                {selected === ballIndex ? "🎉 You found the ball!" : "Try again!"}
              </div>
            )}
            <button
              onClick={handleShuffle}
              disabled={shuffling}
              className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition disabled:opacity-50"
            >
              {shuffling ? "Shuffling..." : revealed ? "Play Again" : "Start"}
            </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default CupGame;