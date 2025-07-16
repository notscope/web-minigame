import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import coinImage from '../assets/coin.png';
import cupImage from '../assets/paper-cup.png';
import spinnerImage from '../assets/wheel-of-fortune.png';
import paintImage from '../assets/paint.png';
import snakeImage from '../assets/snake.png';
import clockImage from '../assets/clock.png';

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main content grows to fill space */}
      <main className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-5xl">
          <h1 className="text-3xl text-center font-bold">Welcome to WebDemo!</h1>
          <p className="text-center">This is a collection of mini project done on react.</p>
          <div className="game-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <GameCard game={{ name: "Coin Flip", description: "Flip a coin!", path: "/coinflip", image: coinImage }} />
            <GameCard game={{ name: "Cup Game", description: "Find the ball!", path: "/cupgame", image: cupImage }} />
            <GameCard game={{ name: "Spin Wheel", description: "Spin to win!", path: "/spinnergame", image: spinnerImage }} />
            <GameCard game={{ name: "Paint", description: "Draw freely!", path: "/paint", image: paintImage }} />
            <GameCard game={{ name: "Snake", description: "Eat and grow!", path: "/snakegame", image: snakeImage }} />
            <GameCard game={{ name: "Clock", description: "See the time.", path: "/clock", image: clockImage }} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;