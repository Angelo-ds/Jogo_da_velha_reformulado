import styles from './square.module.css';

// Componente que representa cada casa individual do tabuleiro
export default function Quadrado({ valor, aoClicarQuadrado, isVencedor }) {
  return (
    <button 
      /* A classe styles.square SEMPRE fica presente. styles.vencedor entra se for true */
      className={`${styles.square} ${isVencedor ? styles.vencedor : ''}`} 
      onClick={aoClicarQuadrado}
    >
      {valor}
    </button>
  );
}