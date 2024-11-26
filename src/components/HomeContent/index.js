import { useState, useEffect } from "react";
import styles from "@/components/HomeContent/HomeContent.module.css";
import Loading from "../Loading";
import axios from "axios";

const HomeContent = () => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/games");
      
      // Adiciona um delay artificial de 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setGames(response.data.games || []);
    } catch (error) {
      console.error("Erro ao buscar jogos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleDelete = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedGame || isDeleting) return;

    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:4000/game/${selectedGame._id}`);
      
      // Atualiza a lista de jogos após deletar
      await fetchGames();
      
      setShowModal(false);
      setSelectedGame(null);

      // Exibe mensagem de sucesso
      const successMessage = document.createElement("div");
      successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        font-family: 'Poppins';
        z-index: 1000;
      `;
      successMessage.textContent = "Jogo excluído com sucesso!";
      document.body.appendChild(successMessage);

      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);
      
    } catch (error) {
      console.error("Erro ao excluir jogo:", error);
      alert("Erro ao excluir jogo. Tente novamente.");
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedGame(null);
  };

  return (
    <>
      <div className={styles.homeContent}>
        <div className={styles.listGamesCard}>
          <div className={styles.title}>
            <h2>Lista de jogos</h2>
          </div>

          {loading ? (
            <Loading loading={loading} />
          ) : games.length === 0 ? (
            <h3 style={{ color: "var(--secondary-color)", fontFamily: "Poppins", marginTop: "1rem" }}>
              Nenhum jogo encontrado
            </h3>
          ) : (
            <div className={styles.games} id={styles.games}>
              {games.map((game) => (
                <ul key={game._id} className={styles.listGames}>
                  <div className={styles.gameImg}>
                    <img src="images/game_cd_cover.png" alt="Jogo em estoque" />
                  </div>
                  <div className={styles.gameInfo}>
                    <h3>Título: {game.title}</h3>
                    <li>Plataforma: {game.platform}</li>
                    <li>Ano: {game.year}</li>
                    <li>Preço: R$ {game.price}</li>

                    <button
                      onClick={() => handleDelete(game)}
                      className="btnPrimary"
                      style={{ marginTop: "1rem" }}
                      disabled={isDeleting}
                    >
                      {isDeleting && selectedGame?._id === game._id ? "Excluindo..." : "Excluir"}
                    </button>
                  </div>
                </ul>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "var(--fourth-color)",
              padding: "2rem",
              borderRadius: "8px",
              textAlign: "center",
              fontFamily: "Poppins",
              border: "1px solid var(--primary-color)",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <h3 style={{ color: "var(--secondary-color)", marginBottom: "1rem" }}>Confirmar Exclusão</h3>
            <p style={{ color: "var(--secondary-color)", marginBottom: "2rem" }}>
              Tem certeza que deseja excluir o jogo "{selectedGame?.title}"?
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: isDeleting ? "#ccc" : "var(--primary-color)",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isDeleting ? "not-allowed" : "pointer",
                }}
              >
                {isDeleting ? "Excluindo..." : "Confirmar"}
              </button>
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#666",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isDeleting ? "not-allowed" : "pointer",
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeContent;
