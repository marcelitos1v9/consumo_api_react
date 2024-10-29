// src/components/Loading/index.js
import styles from "@/components/Loading/loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <img src="images/loading.gif" alt="Carregando" />
      <p>Carregando...</p>
    </div>
  );
};

export default Loading; // Certifique-se de que está exportando corretamente