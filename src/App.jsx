import { useState } from 'react';

// separar isso em um novo componente
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
//---------------------------------------------

// esse deve ser separado em um componente novo que trata o tabuleiro do jogo, falando onde pode ser jogado
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

//-------------------------------------------------------------------

// componente que trata os jogadores
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
//---------------------------------------------------------------------------------



// componente para fazer o jogador ganhar
function calculateWinner(squares) {

  //define as linhas que se completas pelo mesmo jogador, o jogo acaba.
  const lines = [
    [0, 1, 2], // Linha horizontal do topo
    [3, 4, 5], // Linha horizontal do meio
    [6, 7, 8], // Linha horizontal de baixo
    [0, 3, 6], // Coluna vertical da esquerda
    [1, 4, 7], // Coluna vertical do meio
    [2, 5, 8], // Coluna vertical da direita
    [0, 4, 8], // Diagonal principal
    [2, 4, 6], // Diagonal secundária
    ];

  // for que verifica todas as linhas de vitória possiveis
  for (let i = 0; i < lines.length; i++) {

    //aqui eçe desestrutura a o que o for manda, em 3 variaveis, sendo elas o "a","b" e "c".
    // e então armazena um valor em cada uma delas, sendo eles "X" ou "O"
    const [a, b, c] = lines[i];


    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //a repetição do squares[a] é para verificar se a primeira não é "null"
      // ja as outra é de comparação, para verificar se todas as posições são do mesmo jogador, "X" ou "O"


      return squares[a];
      //esse retorna quem ganhou
      // dá pra colocar algo aqui como uma section com efeitos para o jogador



    }
  }




  return null;
  // esse é se não houver nenhuma combinação, ou se o jogo deu velha, então retorna nulo para que continue o jogo, ou acabar se for velha
}
//---------------------------------------