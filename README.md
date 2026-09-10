# ❌⭕ Jogo da Velha (Tic-Tac-Toe) - Edição Refatorada

Seja bem-vindo(a) ao repositório do **Jogo da Velha**! Este projeto foi desenvolvido com foco em refatoração, aplicando boas práticas de desenvolvimento Front-end modernas, componentização, gerenciamento de estado e funcionalidades avançadas como viagem no tempo (time travel) e alternância de temas.

---

## 🎯 Objetivo do Projeto

O objetivo principal é refatorar a estrutura do jogo original, aplicando conceitos avançados de:
- **Componentização** (separação de responsabilidades)
- **Imutabilidade** (padrão funcional)
- **CSS Modules** (estilização isolada)
- **Bootstrap** (layout responsivo)
- **React Hooks** (useState, useEffect)
- **Funcionalidades Avançadas** (time travel, dark mode, destaque de linha vencedora)

---

## 🛠️ Tecnologias e Ferramentas

- **HTML5 & CSS3** (Estruturação semântica e estilização modular)
- **JavaScript (ES6+)** (Lógica e manipulação de estado)
- **React** (Biblioteca para construção da interface de usuário)
- **Vite** (Ferramenta de build ultra-rápida baseada em ES Modules)
- **CSS Modules + BEM** (Estilização isolada com nomenclatura padronizada)

---

## 📋 Requisitos Funcionais

### RF01 - Alternância de Turnos
O sistema deve alternar automaticamente a vez entre os jogadores ('X' e 'O') a cada jogada válida. Após um jogador completar sua ação, o turno passa automaticamente para o oponente.

### RF02 - Validação de Jogadas
O sistema deve impedir jogadas em:
- Posições já ocupadas (que contêm 'X' ou 'O')
- Após o encerramento da partida (quando há vencedor ou empate)

### RF03 - Detecção de Fim de Jogo
O sistema deve identificar automaticamente:
- **Vitória**: alinhamento de três símbolos iguais (linha, coluna ou diagonal)
- **Empate**: todas as 9 células preenchidas sem vencedor

### RF04 - Exibição de Status
O sistema deve exibir claramente:
- Quem é o jogador da vez
- Quem foi o vencedor (ou empate)
- O estado atual da partida

### RF05 - Histórico de Jogadas (Viagem no Tempo)
O sistema deve manter a lista de jogadas anteriores, permitindo que o usuário navegue para qualquer momento da partida através de um histórico interativo.

### RF06 - Reinício da Partida
O sistema deve permitir reiniciar o tabuleiro e iniciar uma nova partida, limpando o estado anterior.

### RF07 - Alternância de Tema (Dark/Light Mode)
O sistema deve permitir que o usuário alterne entre o tema claro e o tema escuro, adaptando a interface dinamicamente.

### RF08 - Destaque da Linha Vencedora
O sistema deve alterar a cor das três células que formaram a trinca vencedora para verde, mantendo a visibilidade e o contraste em ambos os temas visuais.

---

## 📚 Regras de Negócio

### Estado Inicial
- Ao carregar a aplicação, o tabuleiro é apresentado vazio (matriz 3x3 = 9 posições)
- Jogador 'X' é sempre o primeiro a jogar

### Reinicialização
- O botão "Reiniciar" limpa o tabuleiro
- Redefine o jogador atual para 'X'
- Limpa qualquer estado de vitória ou empate anterior
- Redefine o histórico de jogadas

### Turnos Alternados
- A interação ocorre de forma alternada e sequencial
- Após uma jogada válida, o turno passa automaticamente para o oponente
- Transição: X → O → X (e assim sucessivamente)

### Modo de Jogo
- **Local (Dois Jogadores)**: Ambos os jogadores utilizam o mesmo dispositivo, revezando os cliques

### Mecânica de Jogada

**Ações do Jogador:**
1. O jogador clica em uma das 9 células disponíveis
2. Ao clicar em uma célula válida, o símbolo correspondente ('X' ou 'O') é renderizado permanentemente
3. O estado do tabuleiro e histórico são atualizados
4. O turno passa para o próximo jogador

**Rejeição de Jogadas:**
Uma jogada é rejeitada quando:
- A célula está ocupada (já contém 'X' ou 'O')
- O jogo já foi encerrado (vitória ou empate declarados)

### Condições de Vitória
O sistema verifica após cada jogada se há três símbolos iguais em:
- **Linhas**: primeira, segunda ou terceira linha horizontal
- **Colunas**: primeira, segunda ou terceira coluna vertical
- **Diagonais**: diagonal principal (canto superior-esquerdo → inferior-direito) ou diagonal secundária (canto superior-direito → inferior-esquerdo)

Quando uma combinação vencedora é detectada, o jogo declara o jogador correspondente como **vencedor**.

### Condição de Empate (Velha)
Ocorre quando:
- Todas as 9 células estão preenchidas
- Nenhum jogador conseguiu formar uma sequência de três símbolos

### Encerramento da Partida
O jogo é encerrado imediatamente quando:
- Um dos jogadores atinge a condição de vitória
- O tabuleiro é totalmente preenchido sem vencedor (empate)

**Consequências do encerramento:**
- O tabuleiro é travado (não permite novos cliques)
- O botão de reinicialização é ativado
- O status exibe o resultado final

### Histórico de Partidas (Time Travel)
- Funcionalidade que permite visualizar o tabuleiro em qualquer momento anterior da partida
- O usuário clica em um passo do histórico para "viajar" naquele turno
- Útil para análise e revisão de jogadas

### Alternância de Tema
- Dark Mode e Light Mode com adaptação dinâmica de cores
- Manutenção de contraste e legibilidade em ambos os temas

### Destaque da Linha Vencedora
- Se um jogador vencer, as três células que formaram a trinca vencedora são destacadas em **verde**
- O destaque é visível em ambos os temas

---

## 🏗️ Estrutura de Componentes

A aplicação é dividida em componentes React reutilizáveis e bem definidos:

### **1. App** (Componente Principal)
**Responsabilidade:** Gerenciar o estado global da aplicação

```
┌─────────────────────────────────────────┐
│             APP (Principal)             │
│  - Gerencia o histórico de jogadas      │
│  - Controla o tema (dark/light)         │
│  - Armazena o estado geral do jogo      │
└────────────────┬────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
    Header          GameBoard
```

**O que faz:**
- Armazena o histórico completo de todos os estados do tabuleiro
- Mantém a informação do tema ativo (claro ou escuro)
- Passa dados para os componentes filhos através de props

---

### **2. Header** (Cabeçalho)
**Responsabilidade:** Exibir título, status e controles de tema

```
┌──────────────────────────────────┐
│          HEADER                  │
│  ┌──────────────────────────┐   │
│  │  Jogo da Velha           │   │
│  └──────────────────────────┘   │
│  ┌──────────────────────────┐   │
│  │  Status: Turno de X      │   │ ← Quem é a vez
│  └──────────────────────────┘   │
│  ┌──────────────────────────┐   │
│  │  🌙 Dark/Light Toggle    │   │ ← Botão de tema
│  └──────────────────────────┘   │
└──────────────────────────────────┘
```

**O que faz:**
- Exibe o título do jogo
- Mostra quem é a vez atual (X ou O)
- Mostra se alguém ganhou ou se houve empate
- Botão para alternar entre tema escuro e claro

---

### **3. GameBoard** (Tabuleiro de Jogo)
**Responsabilidade:** Renderizar o tabuleiro 3x3 e gerenciar a lógica do jogo

```
┌────────────────────────────────┐
│       GAMEBOARD                │
│  ┌─────────────────────────┐  │
│  │  Square Square Square   │  │
│  │  Square Square Square   │  │ ← Grid 3x3
│  │  Square Square Square   │  │
│  └─────────────────────────┘  │
└────────────────────────────────┘
```

**O que faz:**
- Renderiza 9 componentes `<Square>`
- Gerencia a lógica de vitória, empate e turnos
- Detecta quando alguém ganha ou há empate
- Identifica qual foi a linha vencedora (para destaque)
- Passa funções para os Squares lidarem com cliques

---

### **4. Square** (Célula Individual)
**Responsabilidade:** Renderizar uma célula individual do tabuleiro

```
┌─────────┐
│    X    │ ← Célula clicável
│         │
└─────────┘
```

**O que faz:**
- Exibe o valor da célula ('X', 'O' ou vazio)
- Detecta quando é clicada
- Aplica estilos especiais se faz parte da linha vencedora (verde)
- Rejeita cliques em células já ocupadas

---

### **5. GameHistory** (Histórico de Jogadas)
**Responsabilidade:** Exibir lista de jogadas anteriores e permitir "viagem no tempo"

```
┌──────────────────────────┐
│    GAMEHISTORY           │
│  ┌────────────────────┐ │
│  │ Ir para início      │ │
│  ├────────────────────┤ │
│  │ Jogada 1: X em [0] │ │ ← Clicável
│  │ Jogada 2: O em [1] │ │ ← Clicável
│  │ Jogada 3: X em [2] │ │ ← Clicável
│  │ ...                │ │
│  └────────────────────┘ │
└──────────────────────────┘
```

**O que faz:**
- Lista todas as jogadas da partida
- Permite clicar em uma jogada anterior para "voltar no tempo"
- Mostra o estado do tabuleiro em qualquer ponto da partida
- Atualiza quando novas jogadas são feitas

---

### **6. ResetButton** (Botão de Reinício)
**Responsabilidade:** Reiniciar o jogo

```
┌──────────────────┐
│  🔄 Reiniciar    │ ← Botão
└──────────────────┘
```

**O que faz:**
- Limpa o tabuleiro (todas as células vazias)
- Redefine o jogador para 'X'
- Limpa o histórico de jogadas
- Reseta o estado de vitória/empate

---

## 📊 Fluxo de Dados (Data Flow)

```
┌─────────────────────────────────────────────────────┐
│  APP (Estado Global)                               │
│  - history: Array de estados do tabuleiro          │
│  - theme: 'light' | 'dark'                         │
│  - stepNumber: índice do passo atual               │
└────────────┬────────────────────────────────────────┘
             │
             ├──────────► HEADER
             │           (Status, Tema)
             │
             ├──────────► GAMEBOARD
             │           (Lógica do jogo)
             │           │
             │           └─► SQUARE (x9)
             │               (Renderização)
             │
             └──────────► GAMEHISTORY
                         (Time Travel)
```

**Como funciona:**
1. **App** armazena todo o histórico
2. **Header** mostra o status atual
3. **GameBoard** gerencia a lógica (vitória, empate, turnos)
4. **Square** renderiza cada célula
5. **GameHistory** permite navegar entre estados anteriores

---

## 🎮 Exemplo de Uso Prático

**Cenário:** Jogador X marca a posição 0, depois Jogador O marca a posição 1

```
Estado Inicial:
┌───┬───┬───┐
│ 0 │ 1 │ 2 │
├───┼───┼───┤
│ 3 │ 4 │ 5 │
├───┼───┼───┤
│ 6 │ 7 │ 8 │
└───┴───┴───┘

Após X clicar em [0]:
┌───┬───┬───┐
│ X │ 1 │ 2 │
├───┼───┼───┤
│ 3 │ 4 │ 5 │
├───┼───┼───┤
│ 6 │ 7 │ 8 │
└───┴───┴───┘

Após O clicar em [1]:
┌───┬───┬───┐
│ X │ O │ 2 │
├───┼───┼───┤
│ 3 │ 4 │ 5 │
├───┼───┼───┤
│ 6 │ 7 │ 8 │
└───┴───┴───┘

(Turnos continuam alternando até vitória ou empate)
```

---

## 💻 Como Baixar e Executar o Projeto Localmente

Siga os passos abaixo para rodar a aplicação na sua máquina:

### 1. Clonar o repositório
```bash
git clone https://github.com/Angelo-ds/Jogo_da_velha_reformulado.git
cd Jogo_da_velha_reformulado
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Executar em modo desenvolvimento
```bash
npm run dev
```

### 4. Acessar a aplicação
Abra seu navegador e acesse: `http://localhost:5173/`

### 5. Build para produção
```bash
npm run build
```

---

## 🚀 Funcionalidades Principais

✅ **Jogo Completo de Tic-Tac-Toe** - Lógica totalmente implementada  
✅ **Viagem no Tempo (Time Travel)** - Navegue por jogadas anteriores  
✅ **Alternância de Temas** - Dark Mode e Light Mode  
✅ **Destaque de Linha Vencedora** - Células vencedoras em verde  
✅ **Validação de Jogadas** - Impede movimentos inválidos  
✅ **Status em Tempo Real** - Mostra quem é a vez e resultado  
✅ **Responsivo** - Funciona em diferentes tamanhos de tela  

---

## 📝 Notas de Desenvolvimento

- A aplicação utiliza **React Hooks** (useState) para gerenciamento de estado
- A lógica de vitória verifica 8 combinações possíveis (3 linhas + 3 colunas + 2 diagonais)
- O histórico permite retroceder sem perder dados
- Estilos são organizados em **CSS Modules** para melhor manutenibilidade
- A componização permite fácil expansão futura (ex: IA, multiplayer online)

---

## 👨‍💻 Autor

Projeto desenvolvido com foco em boas práticas e refatoração de código.

---

## 📄 Licença

Este projeto está disponível sob a licença MIT.

---

**Aproveite o jogo! 🎮**
