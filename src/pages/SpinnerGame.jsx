import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const defaultOptions = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function SpinnerGame() {
  const [options, setOptions] = useState(defaultOptions);
  const [input, setInput] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState(null);
  const wheelRef = useRef(null);

  const handleAddOption = () => {
    const trimmed = input.trim();
    if (trimmed && !options.includes(trimmed)) {
      setOptions([...options, trimmed]);
      setInput("");
    }
  };

  const handleRemoveOption = (idx) => {
    setOptions(options.filter((_, i) => i !== idx));
  };

  const spinWheel = () => {
    if (options.length < 2 || spinning) return;

    setSpinning(true);
    setSelected(null);

    const winnerIdx = getRandomInt(options.length);
    const degreesPerSlice = 360 / options.length;
    const randomSpins = 5 + getRandomInt(5);
    const finalDeg =
      360 * randomSpins +
      (360 - winnerIdx * degreesPerSlice - degreesPerSlice / 2);

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 5s cubic-bezier(0.25, 1, 0.5, 1)";
      wheelRef.current.style.transform = `rotate(${finalDeg}deg)`;
    }

    setTimeout(() => {
      setSpinning(false);
      setSelected(options[winnerIdx]);
      if (wheelRef.current) {
        wheelRef.current.style.transition = "none";
        wheelRef.current.style.transform = `rotate(${
          360 - winnerIdx * degreesPerSlice - degreesPerSlice / 2
        }deg)`;
      }
    }, 5100); // Slightly more than 5s
  };

  // Generate conic gradient for wheel background
  const generateWheelGradient = () => {
    const sliceSize = 360 / options.length;
    let currentAngle = 0;
    const segments = options.map((_, i) => {
      const color = `hsl(${(i * 360) / options.length}, 70%, 70%)`;
      const start = currentAngle;
      const end = currentAngle + sliceSize;
      currentAngle = end;
      return `${color} ${start}deg ${end}deg`;
    });
    return `conic-gradient(${segments.join(", ")})`;
  };

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg">
              <div className='header bg-gray-200 p-4'>
                  <Link to="/" className="text-blue-500 hover:underline"><FontAwesomeIcon icon={faArrowLeft} /> Back to Home</Link>
              </div>
              <div className="main p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">Spin Wheel</h2>

                  {/* Input and Add Button */}
                  <div className="mb-4 flex justify-center gap-2">
                      <input
                      type="text"
                      className="border px-3 py-1 rounded"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Add option"
                      disabled={spinning}
                      />
                      <button
                      className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
                      onClick={handleAddOption}
                      disabled={spinning || !input.trim()}
                      >
                      Add
                      </button>
                  </div>

                  {/* Option Tags */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {options.map((opt, idx) => (
                      <span
                          key={opt}
                          className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1"
                      >
                          {opt}
                          <button
                          onClick={() => handleRemoveOption(idx)}
                          className="text-gray-600 hover:text-red-600"
                          disabled={spinning || options.length < 2}
                          title="Remove"
                          >
                          &times;
                          </button>
                      </span>
                      ))}
                  </div>

                  {/* Spinner */}
                  <div className="relative w-80 h-80 mx-auto mb-6">
                      <div
                      ref={wheelRef}
                      className="w-full h-full rounded-full border-[6px] border-gray-400 absolute left-0 top-0"
                      style={{
                          backgroundImage: generateWheelGradient(),
                      }}
                      />
                      {/* Arrow */}
                      <div className="absolute top-[-18px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[18px] border-r-[18px] border-t-[30px] border-l-transparent border-r-transparent border-b-red-500 z-10" />
                  </div>

                  {/* Spin Button */}
                  <button
                      onClick={spinWheel}
                      disabled={spinning || options.length < 2}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded text-lg font-semibold disabled:opacity-50"
                  >
                      {spinning ? "Spinning..." : "Spin"}
                  </button>

                  {/* Winner Text */}
                  {selected && (
                    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                        <div className="text-xl font-bold text-green-700">
                          Winner: {selected}
                        </div>
                        <button
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          onClick={() => setSelected(null)}
                          aria-label="Close"
                        >
                          Close
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

export default SpinnerGame;