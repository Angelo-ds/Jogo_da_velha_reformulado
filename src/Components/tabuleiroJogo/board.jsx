import Quadrado from "../Quadrados/Square.jsx";
import calcularVencedor from '../Vencedor/winner.jsx';

export default function Board({ proximo, quadrados = Array(9).fill(null), aoJogar }) {

  // Obtém o resultado da validação
  const resultado = calcularVencedor(quadrados);
  const vencedor = resultado?.vencedor;
  const linhaVencedora = resultado?.linhaVencedora || [];

  // Controla a lógica quando o jogador clica em uma casa do tabuleiro
  function handleClick(i) {
    // Impede a jogada se o jogo já tiver um vencedor ou se o quadrado já estiver preenchido
    if (vencedor || quadrados[i]) {
      return;
    }
    
    // Cria uma cópia do array de quadrados para manter a imutabilidade do estado
    const proximoQuadrado = quadrados.slice();
    
    // Define se a jogada atual será 'X' ou 'O'
    proximoQuadrado[i] = proximo ? 'X' : 'O';
    
    // Envia o novo estado do tabuleiro para o componente pai atualizar o jogo
    aoJogar(proximoQuadrado);
  }

  // Define o texto de status
  let status;
  if (vencedor) {
    status = 'Vencedor: ' + vencedor;
  } else {
    status = 'Próximo jogador: ' + (proximo ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      
      {/* Primeira linha do tabuleiro */}
      <div className="board-row">
        <Quadrado 
          valor={quadrados[0]} 
          aoClicarQuadrado={() => handleClick(0)} 
          isVencedor={linhaVencedora.includes(0)} 
        />
        <Quadrado 
          valor={quadrados[1]} 
          aoClicarQuadrado={() => handleClick(1)} 
          isVencedor={linhaVencedora.includes(1)} 
        />
        <Quadrado 
          valor={quadrados[2]} 
          aoClicarQuadrado={() => handleClick(2)} 
          isVencedor={linhaVencedora.includes(2)} 
        />
      </div>
      
      {/* Segunda linha do tabuleiro */}
      <div className="board-row">
        <Quadrado 
          valor={quadrados[3]} 
          aoClicarQuadrado={() => handleClick(3)} 
          isVencedor={linhaVencedora.includes(3)} 
        />
        <Quadrado 
          valor={quadrados[4]} 
          aoClicarQuadrado={() => handleClick(4)} 
          isVencedor={linhaVencedora.includes(4)} 
        />
        <Quadrado 
          valor={quadrados[5]} 
          aoClicarQuadrado={() => handleClick(5)} 
          isVencedor={linhaVencedora.includes(5)} 
        />
      </div>
      
      {/* Terceira linha do tabuleiro */}
      <div className="board-row">
        <Quadrado 
          valor={quadrados[6]} 
          aoClicarQuadrado={() => handleClick(6)} 
          isVencedor={linhaVencedora.includes(6)} 
        />
        <Quadrado 
          valor={quadrados[7]} 
          aoClicarQuadrado={() => handleClick(7)} 
          isVencedor={linhaVencedora.includes(7)} 
        />
        <Quadrado 
          valor={quadrados[8]} 
          aoClicarQuadrado={() => handleClick(8)} 
          isVencedor={linhaVencedora.includes(8)} 
        />
      </div>
    </>
  );
}