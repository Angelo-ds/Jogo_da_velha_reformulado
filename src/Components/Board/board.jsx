import Game from "../Game/game";

// separar isso em um novo componente
function Quadrado({ valor, aoClicarQuadrado }) {
  return (
    <button className="square" onClick={aoClicarQuadrado}>
      {valor}
    </button>
  );
}
//---------------------------------------------

// esse deve ser separado em um componente novo que trata o tabuleiro do jogo, falando onde pode ser jogado
function Board({ proximo, quadrados, aoJogar }) {
  function handleClick(i) {
    if (calculateWinner(quadrados) || quadrados[i]) {
      return;
    }
    const proximoQuadrado = quadrados.slice();
    if (proximo) {
      proximoQuadrado[i] = 'X';
    } else {
      proximoQuadrado[i] = 'O';
    }
    aoJogar(proximoQuadrado);
  }

  const winner = calculateWinner(quadrados);
  let status;
  if (vencedor) {
    status = 'Vencedor: ' + vencedor;
  } else {
    status = 'Proximo jogador: ' + (proximo ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={quadrados[0]} aoClicarQuadrado={() => handleClick(0)} />
        <Square value={quadrados[1]} aoClicarQuadrado={() => handleClick(1)} />
        <Square value={quadrados[2]} aoClicarQuadrado={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={quadrados[3]} aoClicarQuadrado={() => handleClick(3)} />
        <Square value={quadrados[4]} aoClicarQuadrado={() => handleClick(4)} />
        <Square value={quadrados[5]} aoClicarQuadrado={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={quadrados[6]} aoClicarQuadrado={() => handleClick(6)} />
        <Square value={quadrados[7]} aoClicarQuadrado={() => handleClick(7)} />
        <Square value={quadrados[8]} aoClicarQuadrado={() => handleClick(8)} />
      </div>
    </>
  );
}

//-------------------------------------------------------------------