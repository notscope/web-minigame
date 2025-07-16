import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function GameCard({ game }) {
  return (
    <div className="game-card bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
      <p className="text-gray-600 mb-4">{game.description}</p>
      <Link to={game.path} className="text-blue-500 hover:underline">
        <FontAwesomeIcon icon={faPlay} />  Play Now 
      </Link>
    </div>
  );
}  

export default GameCard;