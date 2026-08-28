// componente para fazer o jogador ganhar
export default function calcularVencedor(quadrado) {
  if (!quadrado){
    return null
  }
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


    if (quadrado && quadrado[a] && quadrado[a] === quadrado[b] && quadrado[a] === quadrado[c]) {
      //a repetição do squares[a] é para verificar se a primeira não é "null"
      // ja as outra é de comparação, para verificar se todas as posições são do mesmo jogador, "X" ou "O"


      return{ 
        vencedor:  quadrado[a],
        linhaGanhadora: lines[i]
      };
      //esse retorna quem ganhou
      // dá pra colocar algo aqui como uma section com efeitos para o jogador


      
    }
  }




  return null;
  // esse é se não houver nenhuma combinação, ou se o jogo deu velha, então retorna nulo para que continue o jogo, ou acabar se for velha
}
//---------------------------------------