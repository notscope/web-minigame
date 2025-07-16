import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Navbar() {
  return (
    <nav className="bg-gray-100 shadow-md dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              MyApp
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="flex space-x-6 items-center">
            {/* GitHub Button */}
            <a
              href="https://github.com/notscope/web-minigame"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
              title="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;