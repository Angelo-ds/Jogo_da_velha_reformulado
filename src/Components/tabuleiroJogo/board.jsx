import Quadrado from "../Quadrados/Square.jsx";
import calcularVencedor from '../Vencedor/winner.jsx';
import styles from './board.module.css';

export default function Board({ proximo, quadrados = Array(9).fill(null), aoJogar }) {

  // A função calcularVencedor retorna um objeto com 'vencedor' e 'linhaVencedora'
  const resultado = calcularVencedor(quadrados);

  // A variável "resultado" captura os valores do vencedor (se é X ou O) e a linha vencedora.
  // Já o "?." impede que o valor coletado seja nulo
  const vencedor = resultado?.vencedor;
  const linhaVencedora = resultado?.linhaGanhadora || [];

  // Controla a lógica quando o jogador clica em uma casa do tabuleiro
  function handleClick(i) {
    // Impede a jogada se o jogo já tiver um vencedor ou se o quadrado já estiver preenchido
    if (vencedor || quadrados[i]) {
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
  let status;
  
  if (vencedor) {
    status = 'Vencedor: ' + vencedor;
  } else {
    status = 'Próximo jogador: ' + (proximo ? 'X' : 'O');
  }

  // Renderiza o painel de status e o tabuleiro 3x3 usando .map() e Grid
  return (
    <div className={styles.boardContainer}>
      <div className={styles.status}>{status}</div>
      
      {/* Container do tabuleiro estilizado com CSS Grid */}
      <div className={styles.grid}>
        {quadrados.map((valor, indice) => (
          <Quadrado 
            key={indice}
            valor={valor} 
            aoClicarQuadrado={() => handleClick(indice)} 
            isVencedor={linhaVencedora.includes(indice)} 
          />
        ))}
      </div>
    </div>
  );
}