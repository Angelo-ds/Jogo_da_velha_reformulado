// Componente que representa cada casa individual do tabuleiro
function Quadrado({ valor, aoClicarQuadrado }) {
  return (
    <button className="square" onClick={aoClicarQuadrado}>
      {valor}
    </button>
  );
}