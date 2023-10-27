import { useState } from 'react';

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [colorHistory, setColorHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const currentColors = colorHistory[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    let rightSpace;
    if (move > 0) {
      description = 'Go to move #' + move;
      return (
        <div key={move}>
          <button className="text-lg text-white bg-green-400 rounded-lg m-1 p-1 px-4 hover:bg-green-300" onClick={() => jumpTo(move)}>{description}</button>
        </div>
      );
    } else {
      description = 'Go to game start';
      return (
        <div key={move}>
          <button className="text-lg text-white bg-green-400 rounded-lg m-1 p-1 px-2 hover:bg-green-300" onClick={() => jumpTo(move)}>{description}</button>
        </div>
      );
    }
    
  });

  const movesLeft = [moves.slice(0,5)]
  const movesRight = [moves.slice(5,moves.length)]


  function handlePlay(nextSquares, nextColors) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextColorHistory = [...colorHistory.slice(0, currentMove + 1), nextColors];
    setHistory(nextHistory);
    setColorHistory(nextColorHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  return <main className="text-gray-400 bg-gray-900 body-font h-screen">
      <div  className="container mx-auto flex w-1/2 py-10 justify-center">
        <div className="table-auto justify-center gap-2">
          <div className="flex justify-center py-5">
            <div className="flex w-64">
              <div className="inline text-5xl font-bold text-green-400">Tic-</div>
              <div className="inline text-5xl font-bold text-red-400">Tac-</div>
              <div className="inline text-5xl font-bold text-blue-400">Toe</div>
            </div>
          </div>
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} colors={currentColors} />
          <div className="justify-center">
            <td>{movesLeft}</td>
            <td>{movesRight}</td>
          </div>
        </div>
      </div>
    </main>
}

function Board({ xIsNext, squares, onPlay, colors }) {
  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    const nextColors = colors.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
      nextColors[i] = "text-red-400"
    } else {
      nextSquares[i] = "O";
      nextColors[i] = "text-blue-400"
    }
    onPlay(nextSquares, nextColors);
  }

  return <div className="flex justify-center">
    <div className="table table-rows-2">
      <div className="grid grid-rows-3 grid-cols-3 bg-gray-400 gap-2">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} color={colors[0]} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} color={colors[1]} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} color={colors[2]} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} color={colors[3]} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} color={colors[4]} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} color={colors[5]} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} color={colors[6]} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} color={colors[7]} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} color={colors[8]} />
      </div>
      <div className="text-center text-xl"><strong>{status}</strong></div>
    </div>
  </div>
}

function Square({value, onSquareClick, xIsNext, color}) {
  if(color == "text-red-400"){
    return <button className="bg-gray-900 w-14 h-14 text-5xl text-red-400" onClick={onSquareClick}><strong>{value}</strong></button>
  } else{
    return <button className="bg-gray-900 w-14 h-14 text-5xl text-blue-400" onClick={onSquareClick}><strong>{value}</strong></button>
  }
}