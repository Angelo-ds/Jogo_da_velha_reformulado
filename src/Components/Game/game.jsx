import { useState } from 'react';
import Board from '../tabuleiroJogo/board.jsx';
import style from './game.module.css';

// componente que trata os jogadores
export default function Game() {

  // history é um array que guarda cada jogada que ja foi feita
  const [historico, setHistorico] = useState([Array(9).fill(null)]);

  // guarda o número que começa o jogo, sendo ele o "0"
  const [jogadaAtual, setJogadaAtual] = useState(0);

  // ESTADO DO TEMA ESCURO (false = Claro, true = Escuro)
  const [temaEscuro, setTemaEscuro] = useState(false);

  // verifica quem é o proximo jogador na partida com um calculo de resto
  const proximo = jogadaAtual % 2 === 0;

  // captura o tabuleiro do turno no momento, para poder exibir na tela
  const quadradosPreenchidos = historico[jogadaAtual];

  // quando alguém clica em um quadrado essa função é ativada
  function handlePlay(proximoQuadrado) {
    const proximohistorico = [...historico.slice(0, jogadaAtual + 1), proximoQuadrado];
    setHistorico(proximohistorico);
    setJogadaAtual(proximohistorico.length - 1);
  }

  // Função responsável por atualizar o estado para um movimento específico
  function jumpTo(proximoMovimento) {
    setJogadaAtual(proximoMovimento);
  }

  // Transforma o array de histórico em uma lista de elementos HTML
  const movimento = historico.map((quadrado, movimento) => {
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
    /* Aplica o data-theme dinamicamente para sincronizar com as variáveis globais do CSS */
    <div className={style.game} data-theme={temaEscuro ? 'dark' : 'light'}>
      
      {/* Botão de alternar o tema */}
      <div>
        <button onClick={() => setTemaEscuro(!temaEscuro)}>
          {temaEscuro ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
        </button>
      </div>

      {/* Container principal organizando Tabuleiro e Histórico LADO A LADO */}
      <div className={style.gameContainer}>
        {/* Seção do tabuleiro */}
        <div>
          <Board proximo={proximo} quadrados={quadradosPreenchidos} aoJogar={handlePlay} />
        </div>
        
        {/* Seção lateral do histórico de jogadas */}
        <div>
          <ol>{movimento}</ol>
        </div>
      </div>
    </div>
  );
}