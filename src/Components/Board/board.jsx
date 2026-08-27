import Game from "../Game/game";

// Componente que representa cada casa individual do tabuleiro
function Quadrado({ valor, aoClicarQuadrado }) {
  return (
    <button className="square" onClick={aoClicarQuadrado}>
      {valor}
    </button>
  );
}

function Board({ proximo, quadrados, aoJogar }) {

  // Controla a lógica quando o jogador clica em uma casa do tabuleiro
  function handleClick(i) {
    // Impede a jogada se o jogo já tiver um vencedor ou se o quadrado já estiver preenchido
    if (calculateWinner(quadrados) || quadrados[i]) {
      return;
    }
    
    // Cria uma cópia do array de quadrados para manter a imutabilidade do estado
    const proximoQuadrado = quadrados.slice();
    
    // Define se a jogada atual será 'X' ou 'O' com base na vez do jogador
    if (proximo) {
      proximoQuadrado[i] = 'X';
    } else {
      proximoQuadrado[i] = 'O';
    }
    
    // Envia o novo estado do tabuleiro para o componente pai atualizar o jogo
    aoJogar(proximoQuadrado);
  }

  // Verifica o status atual do jogo (se há um vencedor ou quem é o próximo a jogar)
  const winner = calculateWinner(quadrados);
  let status;
  
  if (winner) {
    status = 'Vencedor: ' + winner;
  } else {
    status = 'Proximo jogador: ' + (proximo ? 'X' : 'O');
  }

  // Renderiza o painel de status e as 3 linhas do tabuleiro, ligando cada quadrado ao seu índice
  return (
    <>
      <div className="status">{status}</div>
      
      {/* Primeira linha do tabuleiro */}
      <div className="board-row">
        <Quadrado valor={quadrados[0]} aoClicarQuadrado={() => handleClick(0)} />
        <Quadrado valor={quadrados[1]} aoClicarQuadrado={() => handleClick(1)} />
        <Quadrado valor={quadrados[2]} aoClicarQuadrado={() => handleClick(2)} />
      </div>
      
      {/* Segunda linha do tabuleiro */}
      <div className="board-row">
        <Quadrado valor={quadrados[3]} aoClicarQuadrado={() => handleClick(3)} />
        <Quadrado valor={quadrados[4]} aoClicarQuadrado={() => handleClick(4)} />
        <Quadrado valor={quadrados[5]} aoClicarQuadrado={() => handleClick(5)} />
      </div>
      
      {/* Terceira linha do tabuleiro */}
      <div className="board-row">
        <Quadrado valor={quadrados[6]} aoClicarQuadrado={() => handleClick(6)} />
        <Quadrado valor={quadrados[7]} aoClicarQuadrado={() => handleClick(7)} />
        <Quadrado valor={quadrados[8]} aoClicarQuadrado={() => handleClick(8)} />
      </div>
    </>
  );
}

//-------------------------------------------------------------------