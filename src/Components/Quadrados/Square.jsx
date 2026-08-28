// Componente que representa cada casa individual do tabuleiro
export default function Quadrado({ valor, aoClicarQuadrado, isVencedor }) {
  return (
    <button 
      className={`square ${isVencedor ? 'vencedor' : ''}`} 
      onClick={aoClicarQuadrado}
    >
      {valor}
    </button>
  );
}