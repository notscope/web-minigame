import { useEffect, useRef } from "react";
import "./SnakeGame.css"; // separate styling
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const scoreRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const SCALE_FACTOR = 2.5;
    const SQUARE_SIZE = SCALE_FACTOR * 10;

    let snake = [
      { x: 140, y: 140 },
      { x: 130, y: 140 },
      { x: 120, y: 140 },
      { x: 110, y: 140 },
      { x: 100, y: 140 },
    ];

    let dx = 10;
    let dy = 0;
    let foodX, foodY;
    let score = 0;
    let isGameStarted = false;
    let changingDirection = false;

    const CANVAS_BORDER_COLOR = "black";
    const CANVAS_BACKGROUND_COLOR_1 = "#A2D049";
    const CANVAS_BACKGROUND_COLOR_2 = "#AAD660";
    const SNAKE_COLOR = "blue";
    const SNAKE_HEAD_COLOR = "lightblue";
    const SNAKE_BORDER_COLOR = "darkgreen";
    const FOOD_COLOR = "red";
    const FOOD_BORDER_COLOR = "darkred";

    const drawRect = (x, y, color, border) => {
      ctx.fillStyle = color;
      ctx.strokeStyle = border;
      ctx.fillRect(x * SCALE_FACTOR, y * SCALE_FACTOR, 10 * SCALE_FACTOR, 10 * SCALE_FACTOR);
      ctx.strokeRect(x * SCALE_FACTOR, y * SCALE_FACTOR, 10 * SCALE_FACTOR, 10 * SCALE_FACTOR);
    };

    const clearCanvas = () => {
      for (let y = 0; y < canvas.height / SQUARE_SIZE; y++) {
        for (let x = 0; x < canvas.width / SQUARE_SIZE; x++) {
          ctx.fillStyle = (x + y) % 2 === 0 ? CANVAS_BACKGROUND_COLOR_1 : CANVAS_BACKGROUND_COLOR_2;
          ctx.fillRect(x * SQUARE_SIZE, y * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
        }
      }
      ctx.strokeStyle = CANVAS_BORDER_COLOR;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    };

    const drawSnake = () => {
      snake.forEach((part, index) => {
        const color = index === 0 ? SNAKE_HEAD_COLOR : SNAKE_COLOR;
        drawRect(part.x, part.y, color, SNAKE_BORDER_COLOR);
      });
    };

    const drawFood = () => {
      drawRect(foodX, foodY, FOOD_COLOR, FOOD_BORDER_COLOR);
    };

    const randomTen = (min, max) => Math.round((Math.random() * (max - min) + min) / 10) * 10;

    const createFood = () => {
      foodX = randomTen(0, canvas.width / SCALE_FACTOR - 10);
      foodY = randomTen(0, canvas.height / SCALE_FACTOR - 10);
      if (snake.some(part => part.x === foodX && part.y === foodY)) {
        createFood();
      }
    };

    const moveSnake = () => {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);

      const didEatFood = head.x === foodX && head.y === foodY;
      if (didEatFood) {
        score += 10;
        scoreRef.current.innerText = score;
        createFood();
      } else {
        snake.pop();
      }
    };

    const didGameEnd = () => {
      for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
      }

      const hitLeft = snake[0].x < 0;
      const hitRight = snake[0].x >= canvas.width / SCALE_FACTOR;
      const hitTop = snake[0].y < 0;
      const hitBottom = snake[0].y >= canvas.height / SCALE_FACTOR;

      return hitLeft || hitRight || hitTop || hitBottom;
    };

    const changeDirection = (e) => {
      const key = e.keyCode;
      const LEFT = [37, 65], UP = [38, 87], RIGHT = [39, 68], DOWN = [40, 83];

      if (!isGameStarted) {
        if (!LEFT.includes(key)) {
          isGameStarted = true;
          if (UP.includes(key)) { dx = 0; dy = -10; }
          if (RIGHT.includes(key)) { dx = 10; dy = 0; }
          if (DOWN.includes(key)) { dx = 0; dy = 10; }
          gameLoop();
        }
      } else if (!changingDirection) {
        changingDirection = true;
        if (LEFT.includes(key) && dx === 0) { dx = -10; dy = 0; }
        if (UP.includes(key) && dy === 0) { dx = 0; dy = -10; }
        if (RIGHT.includes(key) && dx === 0) { dx = 10; dy = 0; }
        if (DOWN.includes(key) && dy === 0) { dx = 0; dy = 10; }
      }
    };

    const gameLoop = () => {
      if (!isGameStarted || didGameEnd()) return;
      setTimeout(() => {
        changingDirection = false;
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        gameLoop();
      }, 100);
    };

    // Init game
    createFood();
    clearCanvas();
    drawSnake();
    drawFood();

    document.addEventListener("keydown", changeDirection);

    return () => {
      document.removeEventListener("keydown", changeDirection);
    };
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
                    <div className="main bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl justify-center">
                        <h2 className="snake-title text-center">Snake Game</h2>
                        <div ref={scoreRef} className="snake-score text-center">0</div>
                        <div className="snake-wrapper">
                            <canvas ref={canvasRef} width="450" height="450" id="gameCanvas" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    </>
  );
};

export default SnakeGame;