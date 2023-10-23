import React, { useState, useEffect, useCallback } from 'react';

const numRows = 10;
const numCols = 10;

const App = () => {
  const [snake, setSnake] = useState([{ row: numRows - 1, col: 0 }]);
  const [food, setFood] = useState(generateRandomFoodPosition());
  const [direction, setDirection] = useState('right');
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'down') setDirection('up');
          break;
        case 'ArrowDown':
          if (direction !== 'up') setDirection('down');
          break;
        case 'ArrowLeft':
          if (direction !== 'right') setDirection('left');
          break;
        case 'ArrowRight':
          if (direction !== 'left') setDirection('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction]);

  useEffect(() => {
    if (isGameOver) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'up':
          head.row -= 1;
          break;
        case 'down':
          head.row += 1;
          break;
        case 'left':
          head.col -= 1;
          break;
        case 'right':
          head.col += 1;
          break;
        default:
          break;
      }

      newSnake.unshift(head);

      if (head.row === food.row && head.col === food.col) {
        // Snake ate the food
        setFood(generateRandomFoodPosition());
      } else {
        newSnake.pop();
      }

      // Check for collision with the walls or itself
      if (
        head.row < 0 ||
        head.row >= numRows ||
        head.col < 0 ||
        head.col >= numCols ||
        isSnakeCollidingWithItself(newSnake)
      ) {
        setIsGameOver(true);
        return;
      }

      setSnake(newSnake);
    };

    const gameInterval = setInterval(moveSnake, 500);

    return () => {
      clearInterval(gameInterval);
    };
  }, [snake, direction, food, isGameOver]);

  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        let cellClass = 'cell';
        if (i === food.row && j === food.col) cellClass += ' food';
        if (isSnakeBody(i, j)) cellClass += ' snake';
        row.push(<div key={`${i}-${j}`} className={cellClass} />);
      }
      board.push(
        <div key={i} className="row">
          {row}
        </div>
      );
    }
    return board;
  };

  const generateRandomFoodPosition = () => {
    let newRow, newCol;
    do {
      newRow = Math.floor(Math.random() * numRows);
      newCol = Math.floor(Math.random() * numCols);
    } while (isSnakeBody(newRow, newCol));
    return { row: newRow, col: newCol };
  };

  const isSnakeBody = (row, col) => {
    return snake.some((segment) => segment.row === row && segment.col === col);
  };

  const isSnakeCollidingWithItself = (snakeSegments) => {
    const [head, ...tail] = snakeSegments;
    return tail.some((segment) => segment.row === head.row && segment.col === head.col);
  };

  return (
    <div className="App">
      <h1>Snake Game</h1>
      <div className="game-board">{renderBoard()}</div>
      {isGameOver && <p>Game Over</p>}
    </div>
  );
};

export default App;
