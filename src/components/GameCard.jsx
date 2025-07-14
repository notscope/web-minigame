import { Link } from "react-router-dom";


function GameCard({ game }) {
  return (
    <div className="game-card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
      <p className="text-gray-600 mb-4">{game.description}</p>
      <Link to={game.path} className="text-blue-500 hover:underline">
        Play Now
      </Link>
    </div>
  );
}  

export default GameCard;