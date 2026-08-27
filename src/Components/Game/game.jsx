// componente que trata os jogadores
export default function Game() {

  //history é um array que guarda cada jogada que ja foi feita, e no começo do jogo ele começa como "null" pois ninguem jogou ainda.
  const [memoria, setMemoria] = useState([Array(9).fill(null)]);

//guarda o número que começa o jogo, sendo ele o "0"
  const [jogadaAtual, setJogadaAtual] = useState(0);

  //verifica quem é o proximo jogador na partida com um calculo de resto, onde se for impar, o proximo jogador é "O", e se for par, será "X".
  const proximo = currentMove % 2 === 0;

  //captura o tabuleiro do turno no momento, para poder exibir na tela
  const quadradosPreenchidos = memoria[jogadaAtual];



  //quando alquem clica em um quadrado essa função é ativada
  function handlePlay(proximoQuadrado) {

    //corta o histórico de jogadas passadas se o jogador "Volta no tempo" e só mantem o inicio do jogo ate o momento que ele decidiu voltar.
    const proximaMemoria = [...memoria.slice(0, jogadaAtual + 1), proximoQuadrado];

    //Esses atualizam o estado do react, eles salvam o novo histórico e move o marcador do turno para a última jogada feita.
    setHistory(proximaMemoria);
    setCurrentMove(proximaMemoria.length - 1);

  }

  //armazena a nova posição do tabuleiro e sobrepoe ela na outra
  function jumpTo(proximoMovimento) {
    setCurrentMove(proximoMovimento);
  }


  const movimento = history.map((quadrados, movimento) => {
    let descricao;
    if (movimento > 0) {
      descricao = 'Voltar à jogada #' + movimento;
    } else {
      descricao = 'Voltar ao começo';
    }
    return (
      <li key={movimento}>
        <button onClick={() => jumpTo(movimento)}>{descricao}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={proximo} squares={quadradosPreenchidos} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{movimento}</ol>
      </div>
    </div>
  );
}
//---------------------------------------------------------------------------------
