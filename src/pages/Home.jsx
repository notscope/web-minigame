import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";

function Home() {
  return (
    <div className="home">
      <h1 className="text-3xl text-center">Welcome to the Home Page</h1>
      <p>This is the home page of your web minigame project.</p>
        <div className="game-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <GameCard game={{ name: "Coin Flip", description: "Flip a coin and guess the outcome!", path: "/coinflip" }} />
            <GameCard game={{ name: "Cup Game", description: "Find the ball under the cup!", path: "/cupgame" }} />
        </div>
    </div>
  );
}

export default Home;