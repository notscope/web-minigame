import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main content grows to fill space */}
      <main className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-5xl">
          <h1 className="text-3xl text-center font-bold">Welcome to the Home Page</h1>
          <p className="text-center">This is the home page of your web minigame project.</p>
          <div className="game-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <GameCard game={{ name: "Coin Flip", description: "Flip a coin and guess the outcome!", path: "/coinflip" }} />
            <GameCard game={{ name: "Cup Game", description: "Find the ball under the cup!", path: "/cupgame" }} />
            <GameCard game={{ name: "Spin Wheel", description: "Spin the wheel and see where it lands!", path: "/spinnergame" }} />
            <GameCard game={{ name: "Paint", description: "Draw and create art!", path: "/paint" }} />
            <GameCard game={{ name: "Snake", description: "Control the snake and eat the food!", path: "/snakegame" }} />
            <GameCard game={{ name: "Clock", description: "Display the current time.", path: "/clock" }} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;