// src/components/HomeContent/index.js
import styles from "@/components/HomeContent/HomeContent.module.css";
import Loading from "@/components/Loading"; // Adicione esta linha

const HomeContent = () => {
  return (
    <div className={styles.homeContent}>
      <div className={styles.listGamesCard}>
        <div className={styles.title}>
          <h2>Lista de jogos</h2>
        </div>
        <Loading /> 
        <div className={styles.games} id="games"></div>
      </div>
    </div>
  );
};

export default HomeContent; // Certifique-se de que está exportando corretamente