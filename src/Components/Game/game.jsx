// componente que trata os jogadores
export default function Game() {

  //history é um array que guarda cada jogada que ja foi feita, e no começo do jogo ele começa como "null" pois ninguem jogou ainda.
  const [historico, sethistorico] = useState([Array(9).fill(null)]);

//guarda o número que começa o jogo, sendo ele o "0"
  const [jogadaAtual, setJogadaAtual] = useState(0);

  //verifica quem é o proximo jogador na partida com um calculo de resto, onde se for impar, o proximo jogador é "O", e se for par, será "X".
  const proximo = currentMove % 2 === 0;

  //captura o tabuleiro do turno no momento, para poder exibir na tela
  const quadradosPreenchidos = historico[jogadaAtual];



  //quando alquem clica em um quadrado essa função é ativada
  function handlePlay(proximoQuadrado) {

    //corta o histórico de jogadas passadas se o jogador "Volta no tempo" e só mantem o inicio do jogo ate o momento que ele decidiu voltar.
    const proximahistorico = [...historico.slice(0, jogadaAtual + 1), proximoQuadrado];

    //Esses atualizam o estado do react, eles salvam o novo histórico e move o marcador do turno para a última jogada feita.
    setHistory(proximahistorico);
    setCurrentMove(proximahistorico.length - 1);

  }

// Função responsável por atualizar o estado para um movimento específico,
  // permitindo "voltar no tempo" para qualquer jogada anterior.
  function jumpTo(proximoMovimento) {
    setCurrentMove(proximoMovimento);
  }

  // Transforma o array de histórico em uma lista de elementos HTML.
  // Cada item gera um botão para que o usuário possa retornar àquele estado do jogo.
  const movimento = historico.map((quadrados, movimento) => {
    let descricao;
    if (movimento > 0) {
      descricao = 'Voltar à jogada #' + movimento;
    } else {
      descricao = 'Voltar ao começo';
    }
    return (
      <li key={movimento}>
        {/* Ao clicar, chama o jumpTo passando o índice do movimento correspondente */}
        <button onClick={() => jumpTo(movimento)}>{descricao}</button>
      </li>
    );
  });

  return (
    <div className="game">
      {/* Seção principal contendo o tabuleiro e suas regras atuais */}
      <div className="game-board">
        <Board xIsNext={proximo} squares={quadradosPreenchidos} onPlay={handlePlay} />
      </div>
      
      {/* Seção lateral contendo as informações e o histórico de jogadas */}
      <div className="game-info">
        <ol>{movimento}</ol>
      </div>
    </div>
  );
}
//---------------------------------------------------------------------------------
